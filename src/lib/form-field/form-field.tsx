import {
  FieldErrors,
  FormState,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { FormFieldWrapper } from '@lib';
import { AppForm, FormFieldData } from '@utils';

type FormFieldProps = {
  name: keyof AppForm;
  fieldData: FormFieldData;
  dataset?: FormFieldData['options'];
  register: UseFormRegister<AppForm>;
  errors: FieldErrors<AppForm>;
  touched: FormState<AppForm>['touchedFields'];
};

export const FormField = ({
  name,
  fieldData,
  dataset,
  register,
  errors,
  touched,
}: FormFieldProps) => {
  const inputRegister: UseFormRegisterReturn = register(name);
  switch (fieldData.type) {
    case 'text':
    case 'password':
    case 'number':
    case 'email':
    case 'checkbox':
    case 'file':
      if (fieldData.type === 'text' && (dataset || fieldData.options)) {
        return (
          <>
            <datalist id={`${name}-datalist`}>
              {(dataset || fieldData.options || []).map(({ value, label }) => (
                <option key={value} value={value} label={label ?? value} />
              ))}
            </datalist>
            <FormFieldWrapper
              label={fieldData.label}
              name={name}
              required={inputRegister.required}
              error={errors[name]}
              touched={touched[name]}
            >
              <input
                {...inputRegister}
                type={fieldData.type}
                id={name}
                list={`${name}-datalist`}
                autoComplete="nope"
              />
            </FormFieldWrapper>
          </>
        );
      }
      return (
        <FormFieldWrapper
          label={fieldData.label}
          name={name}
          required={inputRegister.required}
          error={errors[name]}
          touched={touched[name]}
          inputBeforeLabel={fieldData.type === 'checkbox'}
        >
          <input
            {...inputRegister}
            type={fieldData.type}
            id={name}
            placeholder={fieldData.placeholder}
            autoComplete="nope"
            accept={fieldData.accept}
          />
        </FormFieldWrapper>
      );
    case 'select':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          name={name}
          required={inputRegister.required}
          error={errors[name]}
          touched={touched[name]}
        >
          <select {...inputRegister} id={name} defaultValue={''}>
            {fieldData.placeholder && (
              <option value="" disabled>
                {fieldData.placeholder}
              </option>
            )}
            {(fieldData.options || []).map(({ value, label }) => (
              <option key={value} value={value} label={label ?? value} />
            ))}
          </select>
        </FormFieldWrapper>
      );
    default:
      throw new Error(`Unknown field type: ${fieldData.type}`);
  }
};

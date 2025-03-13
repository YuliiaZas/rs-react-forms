import {
  FieldErrors,
  FormState,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { FormFieldWrapper } from '@lib';
import { AppForm, FormFieldData } from '@utils';

export const FormField = ({
  name,
  fieldData,
  register,
  errors,
  touched,
}: {
  name: keyof AppForm;
  fieldData: FormFieldData;
  register: UseFormRegister<AppForm>;
  errors: FieldErrors<AppForm>;
  touched: FormState<AppForm>['touchedFields'];
}) => {
  const inputRegister: UseFormRegisterReturn = register(name);
  switch (fieldData.type) {
    case 'text':
    case 'password':
    case 'number':
    case 'email':
    case 'checkbox':
    case 'file':
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
            autoComplete={'off'}
            accept={fieldData.accept}
          />
        </FormFieldWrapper>
      );
    case 'radio':
      return (
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
            autoComplete={'off'}
          />
        </FormFieldWrapper>
      );
    default:
      throw new Error(`Unknown field type: ${fieldData.type}`);
  }
};

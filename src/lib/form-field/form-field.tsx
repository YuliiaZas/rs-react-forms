import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { FormFieldWrapper } from '@lib';
import { AppForm, FormFieldData } from '@utils';
import { useState } from 'react';

type FormFieldProps = {
  name: keyof AppForm;
  fieldData: FormFieldData;
  dataset?: FormFieldData['options'];
  register: UseFormRegister<AppForm>;
  trigger: UseFormTrigger<AppForm>;
  setValue: UseFormSetValue<AppForm>;
  errors: FieldErrors<AppForm>;
  touched: Partial<Record<keyof AppForm, boolean>>;
  defaultValue: AppForm[keyof AppForm];
};

export const FormField = ({
  name,
  fieldData,
  dataset,
  register,
  trigger,
  setValue,
  errors,
  touched,
  defaultValue,
}: FormFieldProps) => {
  const inputRegister: UseFormRegisterReturn = register(name);
  const [currentType, setCurrentType] = useState(fieldData.type);
  const [showDefaultFile, setShowDefaultFile] = useState(
    fieldData.type === 'file' && !!defaultValue
  );

  const switchInputType = () => {
    console.log(touched);
    setCurrentType(isTypeText() ? fieldData.type : 'text');
  };

  const isTypeText = () => currentType === 'text';

  switch (fieldData.type) {
    case 'text':
    case 'number':
    case 'email':
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
              required={fieldData.required}
              error={errors[name]}
              touched={touched[name]}
              inputTitle={fieldData.title}
            >
              <input
                {...inputRegister}
                type={fieldData.type}
                id={name}
                list={`${name}-datalist`}
                defaultValue={defaultValue as string}
                autoComplete="nope"
                onBlur={() => trigger(name)}
              />
            </FormFieldWrapper>
          </>
        );
      }
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          touched={touched[name]}
          inputTitle={fieldData.title}
        >
          <input
            {...inputRegister}
            type={fieldData.type}
            id={name}
            defaultValue={defaultValue as string}
            placeholder={fieldData.placeholder}
            autoComplete="nope"
            onBlur={() => trigger(name)}
          />
        </FormFieldWrapper>
      );
    case 'checkbox':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          touched={touched[name]}
          inputTitle={fieldData.title}
          inputBeforeLabel={true}
        >
          <input
            {...inputRegister}
            type={fieldData.type}
            id={name}
            defaultChecked={defaultValue as boolean}
            placeholder={fieldData.placeholder}
            autoComplete="nope"
            onBlur={() => trigger(name)}
          />
        </FormFieldWrapper>
      );
    case 'file':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          touched={touched[name]}
          inputTitle={fieldData.title}
        >
          <div className={showDefaultFile ? 'file-uploaded' : ''}>
            <input
              {...inputRegister}
              type={fieldData.type}
              id={name}
              placeholder={fieldData.placeholder}
              autoComplete="nope"
              accept={fieldData.accept?.join(',')}
              onBlur={() => {
                console.log(name, 'onBlur');
                trigger(name);
                setValue('isDefaultFile', false);
                setShowDefaultFile(false);
              }}
            />
            <input
              type="checkbox"
              className="d-none"
              {...register('isDefaultFile')}
              defaultChecked={!!defaultValue}
            />
            <span className="file-uploaded-info">File is uploaded</span>
          </div>
        </FormFieldWrapper>
      );
    case 'password':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          touched={touched[name]}
          inputTitle={fieldData.title}
        >
          <div className={`input-with-icons`}>
            <input
              {...inputRegister}
              type={currentType}
              id={name}
              defaultValue={defaultValue as string}
              placeholder={fieldData.placeholder}
              autoComplete="nope"
              onBlur={() => {
                trigger(name);
              }}
            />
            <span
              className={`icon-right pointer`}
              title="Clear"
              onClick={() => switchInputType()}
            >
              {isTypeText() ? <span>&#128584;</span> : <span>&#128064;</span>}
            </span>
          </div>
        </FormFieldWrapper>
      );
    case 'select':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          touched={touched[name]}
          inputTitle={fieldData.title}
        >
          <select
            {...inputRegister}
            id={name}
            defaultValue={defaultValue as string}
          >
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

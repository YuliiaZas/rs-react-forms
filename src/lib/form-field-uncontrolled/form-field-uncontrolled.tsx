import { FormFieldWrapper } from '@lib';
import { AppForm, FormFieldData } from '@utils';
import { useRef, useState } from 'react';

export type ErrorFormFieldUncontrolled = Partial<Record<keyof AppForm, string>>;

type FormFieldUncontrolledProps = {
  name: keyof AppForm;
  fieldData: FormFieldData;
  dataset?: FormFieldData['options'];
  errors: ErrorFormFieldUncontrolled;
  defaultValue: AppForm[keyof AppForm];
};

export const FormFieldUncontrolled = ({
  name,
  fieldData,
  dataset,
  errors,
  defaultValue,
}: FormFieldUncontrolledProps) => {
  const [currentType, setCurrentType] = useState(fieldData.type);
  const [showDefaultFile, setShowDefaultFile] = useState(
    fieldData.type === 'file' && !!defaultValue
  );

  const switchInputType = () =>
    setCurrentType(isTypeText() ? fieldData.type : 'text');

  const isTypeText = () => currentType === 'text';

  const isDefaultFileRef = useRef<HTMLInputElement>(null);

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
              inputTitle={fieldData.title}
            >
              <input
                type={fieldData.type}
                id={name}
                list={`${name}-datalist`}
                defaultValue={defaultValue as string}
                autoComplete="nope"
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
          inputTitle={fieldData.title}
        >
          <input
            type={fieldData.type}
            id={name}
            defaultValue={defaultValue as string}
            placeholder={fieldData.placeholder}
            autoComplete="nope"
          />
        </FormFieldWrapper>
      );
    case 'checkbox':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          inputTitle={fieldData.title}
          inputBeforeLabel={true}
        >
          <input
            type={fieldData.type}
            id={name}
            defaultChecked={defaultValue as boolean}
            placeholder={fieldData.placeholder}
            autoComplete="nope"
          />
        </FormFieldWrapper>
      );
    case 'file':
      return (
        <FormFieldWrapper
          label={fieldData.label}
          required={fieldData.required}
          error={errors[name]}
          inputTitle={fieldData.title}
        >
          <div className={showDefaultFile ? 'file-uploaded' : ''}>
            <input
              type={fieldData.type}
              id={name}
              placeholder={fieldData.placeholder}
              autoComplete="nope"
              accept={fieldData.accept?.join(',')}
              onBlur={() => {
                setShowDefaultFile(false);
                if (isDefaultFileRef.current) {
                  isDefaultFileRef.current.value = 'false';
                }
              }}
            />
            <input
              type="checkbox"
              className="d-none"
              ref={isDefaultFileRef}
              id="isDefaultFileRef"
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
          inputTitle={fieldData.title}
        >
          <div className={`input-with-icons`}>
            <input
              type={currentType}
              id={name}
              defaultValue={defaultValue as string}
              placeholder={fieldData.placeholder}
              autoComplete="nope"
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
          inputTitle={fieldData.title}
        >
          <select id={name} defaultValue={defaultValue as string}>
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

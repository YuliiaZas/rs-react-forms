import { getChildInputId } from '@utils';
import { FormFieldError } from '../form-field-error/form-field-error';
import { FormFieldLabel } from '../form-field-label/form-field-label';
import React from 'react';

interface FormFieldWrapperProps {
  children: React.ReactElement<HTMLInputElement>;
  label?: string;
  required?: boolean;
  error?: { message?: string };
  touched?: boolean;
  inputBeforeLabel?: boolean;
  inputTitle?: string;
}

export const FormFieldWrapper = ({
  children,
  label,
  required,
  error,
  touched,
  inputBeforeLabel = false,
  inputTitle,
}: FormFieldWrapperProps) => {
  const id = getChildInputId(children);
  if (label && !id) {
    throw new Error('No id found for form field');
  }

  if (inputBeforeLabel) {
    return (
      <div className="d-flex-column align-start mb-1">
        <div>
          {children}
          <FormFieldLabel
            label={label}
            id={id}
            required={required}
            hint={inputTitle}
          />
        </div>
        <FormFieldError touched={touched} errorMessage={error?.message} />
      </div>
    );
  }

  return (
    <div className="d-flex justify-space-between align-start mb-1 gap-1">
      <FormFieldLabel
        label={label}
        id={id}
        required={required}
        hint={inputTitle}
      />
      <div className="d-flex-column align-end text-end">
        {children}
        <FormFieldError touched={touched} errorMessage={error?.message} />
      </div>
    </div>
  );
};

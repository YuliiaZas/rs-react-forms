import { FormFieldError } from '../form-field-error/form-field-error';
import { FormFieldLabel } from '../form-field-label/form-field-label';
import React from 'react';

interface FormFieldWrapperProps {
  children: React.ReactElement<HTMLInputElement>;
  label?: string;
  name?: string;
  required?: boolean;
  error?: { message?: string };
  touched?: boolean;
  inputBeforeLabel?: boolean;
}

export const FormFieldWrapper = ({
  children,
  label,
  name,
  required,
  error,
  touched,
  inputBeforeLabel = false,
}: FormFieldWrapperProps) => {
  console.log('FormFieldWrapper', name, children, label);
  const id = name || getChildId(children) || '';
  if (label && !id) {
    throw new Error('No id found for form field');
  }

  if (inputBeforeLabel) {
    return (
      <div className="d-flex-column align-start mb-1">
        <div>
          {children}
          <FormFieldLabel label={label} id={id} required={required} />
        </div>
        <FormFieldError touched={touched} errorMessage={error?.message} />
      </div>
    );
  }

  return (
    <div className="d-flex justify-space-between align-start mb-1 gap-1">
      <FormFieldLabel label={label} id={id} required={required} />
      <div className="d-flex-column align-end text-end">
        {children}
        <FormFieldError touched={touched} errorMessage={error?.message} />
      </div>
    </div>
  );
};
// {/* {label && (
//   <label htmlFor={id} className={required ? 'required' : ''}>
//     {label}
//   </label>
// )} */}
// {/* <span
//   className={`input-error-message ${touched && error ? '' : 'empty'}`}
// >
//   {error?.message}
// </span> */}

export const getChildId = (children: FormFieldWrapperProps['children']) => {
  const child = React.Children.only(children);
  if (React.isValidElement(child) && 'id' in child.props) {
    return child.props.id;
  }
  return null;
};

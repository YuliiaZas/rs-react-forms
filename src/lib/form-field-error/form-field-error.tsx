type FormFieldErrorProps = {
  touched?: boolean;
  errorMessage?: string;
};

export const FormFieldError = ({
  touched,
  errorMessage,
}: FormFieldErrorProps) => {
  return (
    <span
      className={`input-error-message ${touched && errorMessage ? '' : 'empty'}`}
    >
      {errorMessage}
    </span>
  );
};

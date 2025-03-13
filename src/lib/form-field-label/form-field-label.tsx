type FormFieldLabelProps = {
  label?: string;
  id: string;
  required?: boolean;
};

export const FormFieldLabel = ({
  label,
  id,
  required,
}: FormFieldLabelProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={`input-label ${required ? 'required' : ''}`}
        >
          {label}
        </label>
      )}
    </>
  );
};

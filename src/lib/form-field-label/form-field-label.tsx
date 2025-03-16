type FormFieldLabelProps = {
  label?: string;
  id: string;
  required?: boolean;
  hint?: string;
};

export const FormFieldLabel = ({
  label,
  id,
  required,
  hint,
}: FormFieldLabelProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={`input-label ${required ? 'required' : ''}`}
        >
          {label}
          {hint && (
            <span className="input-title" title={hint}>
              i
            </span>
          )}
        </label>
      )}
    </>
  );
};

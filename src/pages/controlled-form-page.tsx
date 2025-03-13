import { yupResolver } from '@hookform/resolvers/yup';
// import { useAppSelector } from '@hooks';
import { FormField, FormFieldWrapper } from '@lib';
// import { getCountries } from '@store';
import { AppForm, FORM_FIELD1, formFieldMap, formSchema } from '@utils';
import { useForm } from 'react-hook-form';

export const ControlledFormPage = () => {
  // const countries = useAppSelector((state) => getCountries(state));

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  // const fields = Object.values(FORM_FIELD);
  const fields = Object.values(FORM_FIELD1);
  console.log('fields', fields);
  const onSubmit = async (data: AppForm) => {
    console.log('Saving data', data);
  };
  console.log('errors', errors);
  console.log('touchedFields', touchedFields);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
      {fields.map((field) => {
        const fieldName = field as keyof AppForm;
        const fieldData = formFieldMap[fieldName];
        return (
          <FormField
            name={fieldName}
            fieldData={fieldData}
            register={register}
            errors={errors}
            touched={touchedFields}
            key={fieldName}
          />
        );
      })}
      <div>
        <FormFieldWrapper>
          <button>{'Save'}</button>
        </FormFieldWrapper>
      </div>
    </form>
  );
};

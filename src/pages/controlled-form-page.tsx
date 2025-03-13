import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@hooks';
import { FormField, FormFieldWrapper } from '@lib';
import { getCountries } from '@store';
import {
  AppForm,
  FORM_FIELD,
  FORM_FIELD1,
  FormFieldMap,
  formFieldMap,
  formSchema,
} from '@utils';

export const ControlledFormPage = () => {
  const countries = useAppSelector((state) => getCountries(state));

  const [formData, setFormData] = useState<FormFieldMap>(formFieldMap);

  useEffect(() => {
    setFormData({
      ...formFieldMap,
      [FORM_FIELD.COUNTRY]: {
        ...formFieldMap.country,
        options: countries.map((country) => ({
          value: country.name,
          label: `${country.flag} ${country.name}`,
        })),
      },
    });
  }, [countries]);

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
        return (
          <FormField
            name={fieldName}
            fieldData={formData[fieldName]}
            register={register}
            errors={errors}
            touched={touchedFields}
            key={fieldName}
          />
        );
      })}
      <div>
        <FormFieldWrapper>
          <button>Save</button>
        </FormFieldWrapper>
      </div>
    </form>
  );
};

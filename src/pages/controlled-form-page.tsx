import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { FormField, FormFieldWrapper } from '@lib';
import { getControlledForm, getCountries, setControlledForm } from '@store';
import {
  AppForm,
  FORM_FIELD,
  FormFieldMap,
  formFieldMap,
  formSchema,
  UserInfo,
} from '@utils';
import { FileStringifier } from '@services';

export const ControlledFormPage = () => {
  const dispatch = useAppDispatch();

  const fields = Object.values(FORM_FIELD);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const countries = useAppSelector((state) => getCountries(state));
  const formValue = useAppSelector((state) => getControlledForm(state));

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

  const onSubmit = async (data: AppForm) => {
    if (data.file === 'string') {
      dispatch(setControlledForm({ formData: data as UserInfo }));
    } else {
      const file = await FileStringifier.fileToBase64(
        (data.file as FileList)[0]
      );
      dispatch(
        setControlledForm({
          formData: {
            ...data,
            file,
          },
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
      {fields.map((field) => {
        const fieldName = field as keyof AppForm;
        return (
          <FormField
            name={fieldName}
            fieldData={formData[fieldName]}
            defaultValue={formValue[fieldName]}
            register={register}
            errors={errors}
            touched={touchedFields}
            trigger={trigger}
            key={fieldName}
          />
        );
      })}
      <div>
        <FormFieldWrapper>
          <button disabled={!isValid}>Save</button>
        </FormFieldWrapper>
      </div>
    </form>
  );
};

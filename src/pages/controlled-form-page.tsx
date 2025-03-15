import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks';
import { FormField, FormFieldWrapper } from '@lib';
import { getControlledForm, getCountries, setForm } from '@store';
import { FileStringifier } from '@services';
import {
  AppForm,
  FORM_FIELD,
  FORM_TYPE,
  FormFieldMap,
  formFieldMap,
  formSchema,
  PATH_VALUE,
} from '@utils';

export const ControlledFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const formId =
    searchParams.get('i') === null ? null : Number(searchParams.get('i'));

  const countries = useAppSelector((state) => getCountries(state));
  const defaultFormValue = useAppSelector((state) =>
    getControlledForm(state, formId)
  );

  const fields = Object.values(FORM_FIELD);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [formDataMap, setFormDataMap] = useState<FormFieldMap>(formFieldMap);

  useEffect(() => {
    setFormDataMap({
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
    const file = data.isDefaultFile
      ? (defaultFormValue.file as string)
      : await FileStringifier.fileToBase64((data.file as FileList)[0]);

    dispatch(
      setForm({
        formValue: {
          ...data,
          file,
          isDefaultFile: true,
        },
        id: formId,
        formType: FORM_TYPE.CONTROLLED,
      })
    );
    navigate(PATH_VALUE.HOME);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
      {fields.map((field) => {
        const fieldName = field as keyof AppForm;
        return (
          <FormField
            name={fieldName}
            fieldData={formDataMap[fieldName]}
            defaultValue={defaultFormValue[fieldName]}
            register={register}
            errors={errors}
            touched={touchedFields}
            trigger={trigger}
            setValue={setValue}
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

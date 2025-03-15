import { useAppDispatch, useAppSelector } from '@hooks';
import { ErrorFormFieldUncontrolled, FormFieldWrapper } from '@lib';
import { FileStringifier } from '@services';
import { getCountries, getUncontrolledForm, setUncontrolledForm } from '@store';
import {
  AppForm,
  FORM_FIELD,
  FormFieldMap,
  formFieldMap,
  formSchema,
  PATH_VALUE,
} from '@utils';
import { FormFieldUncontrolled } from '@lib';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const UncontrolledFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const formId =
    searchParams.get('i') === null ? null : Number(searchParams.get('i'));

  const countries = useAppSelector((state) => getCountries(state));
  const defaultFormValue = useAppSelector((state) =>
    getUncontrolledForm(state, formId)
  );

  const fields = Object.values(FORM_FIELD);

  const [formDataMap, setFormDataMap] = useState<FormFieldMap>(formFieldMap);
  const [isFileLoadError, setIsFileLoadError] = useState(false);

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
  const [errors, setErrors] = useState<ErrorFormFieldUncontrolled>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formControls = (e.target as HTMLFormElement)
      .elements as HTMLFormControlsCollection;
    const formValue = [...formControls].reduce((acc: AppForm, formControl) => {
      if (
        (formControl instanceof HTMLInputElement ||
          formControl instanceof HTMLSelectElement) &&
        formControl.id
      ) {
        return {
          ...acc,
          [formControl.id]:
            formControl.type === 'checkbox'
              ? formControl.checked
              : formControl.type === 'file'
                ? formControl.files
                : formControl.value,
        };
      }
      return acc;
    }, {} as AppForm);

    const formValueValid = await formSchema
      .validate(formValue, { abortEarly: false })
      .catch((err) => {
        setErrors(
          err.inner.reduce(
            (
              acc: ErrorFormFieldUncontrolled,
              error: { message: string; path: string }
            ) => ({
              ...acc,
              [error.path]: error.message,
            }),
            {}
          )
        );
        return null;
      });
    if (formValueValid) {
      setErrors({});
      onSubmit(formValueValid);
    }
    console.log(errors, formValueValid);
  };

  const onSubmit = async (data: AppForm) => {
    const file = data.isDefaultFile
      ? (defaultFormValue.file as string)
      : await (async () => {
          try {
            return await FileStringifier.fileToBase64(
              (data.file as FileList)[0]
            );
          } catch (error) {
            setIsFileLoadError(true);
            console.error(error);
            return null;
          }
        })();
    if (!file) return;
    setIsFileLoadError(false);

    dispatch(
      setUncontrolledForm({
        formValue: {
          ...data,
          file,
          isDefaultFile: true,
        },
        id: formId,
      })
    );
    navigate(PATH_VALUE.HOME);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      {fields.map((field) => {
        const fieldName = field as keyof AppForm;
        return (
          <FormFieldUncontrolled
            name={fieldName}
            fieldData={formDataMap[fieldName]}
            defaultValue={defaultFormValue[fieldName]}
            errors={errors}
            key={fieldName}
          />
        );
      })}
      <div>
        <FormFieldWrapper>
          <div>
            <button>Save</button>
            {formId?.toString()}
            {isFileLoadError && (
              <p>
                There was an error while uploading your file. Please attach the
                file one moretime
              </p>
            )}
          </div>
        </FormFieldWrapper>
      </div>
    </form>
  );
};

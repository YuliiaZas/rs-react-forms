import { boolean, number, object, ObjectSchema, ref, string, mixed } from 'yup';
import { FORM_FIELD } from './form.enum';
import { getRequiredMessage } from './form-label.const';
import { characterSet, formFieldMap } from './form-map.const';

export type AppForm = {
  name: string;
  age?: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  file?: FileList | string;
  country: string;
};

const validateFileSize = (value?: FileList | string): boolean => {
  if (!value || typeof value === 'string' || !value.length) return true;
  const file = value[0];
  return file.size <= 1024 * 1024;
};

const validateFileType = (
  accept: string[],
  value?: FileList | string
): boolean => {
  if (!value || typeof value === 'string' || !value.length) return true;
  const file = value[0];
  return accept.includes(file.type);
};

export const formSchema: ObjectSchema<AppForm> = object({
  [FORM_FIELD.NAME]: string()
    .required(getRequiredMessage(FORM_FIELD.EMAIL))
    .matches(/^[A-Z]/, 'First name must start with an uppercase letter'),
  [FORM_FIELD.AGE]: number()
    .required(getRequiredMessage(FORM_FIELD.AGE))
    .typeError('Age must be a ${type}')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  [FORM_FIELD.EMAIL]: string()
    .required(getRequiredMessage(FORM_FIELD.EMAIL))
    .email('Email must be a valid email'),
  [FORM_FIELD.PASSWORD]: string()
    .required(getRequiredMessage(FORM_FIELD.PASSWORD))
    .matches(
      new RegExp(
        `^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[${characterSet}]).*$`
      ),
      'Password is not strong enough. See info'
    )
    .matches(/^(?!.*\\).*$/, 'Password should not contain character "\\"'),
  [FORM_FIELD.CONFIRM_PASSWORD]: string()
    .required(getRequiredMessage(FORM_FIELD.CONFIRM_PASSWORD))
    .oneOf([ref(FORM_FIELD.PASSWORD), ''], 'Passwords must match'),
  [FORM_FIELD.GENDER]: string().required(getRequiredMessage(FORM_FIELD.GENDER)),
  [FORM_FIELD.FILE]: mixed<FileList | string>()
    .transform((value) => (value.length ? value : undefined))
    .required(getRequiredMessage(FORM_FIELD.FILE))
    .test('fileSize', 'File size must be less than 1MB', (value) =>
      validateFileSize(value)
    )
    .test('fileType', 'File type must be JPEG or PNG', (value) =>
      validateFileType(formFieldMap[FORM_FIELD.FILE].accept!, value)
    ),
  [FORM_FIELD.AGREEMENT]: boolean()
    .default(false)
    .oneOf([true], 'You must accept the terms and conditions'),
  [FORM_FIELD.COUNTRY]: string().required(
    getRequiredMessage(FORM_FIELD.COUNTRY)
  ),
});

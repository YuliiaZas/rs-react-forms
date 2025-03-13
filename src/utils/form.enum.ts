import { boolean, number, object, ObjectSchema, ref, string } from 'yup';

export enum FORM_FIELD {
  NAME = 'name',
  AGE = 'age',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  GENDER = 'gender',
  AGREEMENT = 'agreement',
  FILE = 'file',
  COUNTRY = 'country',
}
export enum FORM_FIELD1 {
  NAME = 'name',
  AGE = 'age',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  GENDER = 'gender',
  AGREEMENT = 'agreement',
  // FILE = 'file',
  COUNTRY = 'country',
}

export enum TABLE_LABEL {
  FILE = FORM_FIELD.FILE,
  NAME = FORM_FIELD.NAME,
  AGE = FORM_FIELD.AGE,
  EMAIL = FORM_FIELD.EMAIL,
  GENDER = FORM_FIELD.GENDER,
  COUNTRY = FORM_FIELD.COUNTRY,
}

export const formLabel = {
  [FORM_FIELD.NAME]: 'First Name',
  [FORM_FIELD.AGE]: 'Age',
  [FORM_FIELD.EMAIL]: 'Email',
  [FORM_FIELD.PASSWORD]: 'Password',
  [FORM_FIELD.CONFIRM_PASSWORD]: 'Confirm Password',
  [FORM_FIELD.GENDER]: 'Gender',
  [FORM_FIELD.AGREEMENT]: 'Accept Terms and Conditions Agreement',
  [FORM_FIELD.FILE]: 'Picture',
  [FORM_FIELD.COUNTRY]: 'Country',
};
export const getLabel = (field: FORM_FIELD) => formLabel[field];

export type FormFieldData = {
  type: string;
  label: string;
  placeholder?: string;
  options?: OptionItem[];
  accept?: string;
};

export type FormFieldMap = Record<string, FormFieldData>;

export const formFieldMap: FormFieldMap = {
  [FORM_FIELD.NAME]: {
    type: 'text',
    label: getLabel(FORM_FIELD.NAME),
    placeholder: 'Enter your first name',
  },
  [FORM_FIELD.AGE]: {
    type: 'number',
    label: getLabel(FORM_FIELD.AGE),
    placeholder: 'Enter your age',
  },
  [FORM_FIELD.EMAIL]: {
    type: 'email',
    label: getLabel(FORM_FIELD.EMAIL),
    placeholder: 'Enter your email',
  },
  [FORM_FIELD.PASSWORD]: {
    type: 'password',
    label: getLabel(FORM_FIELD.PASSWORD),
    placeholder: 'Enter your password',
  },
  [FORM_FIELD.CONFIRM_PASSWORD]: {
    type: 'password',
    label: getLabel(FORM_FIELD.CONFIRM_PASSWORD),
    placeholder: 'Confirm your password',
  },
  [FORM_FIELD.GENDER]: {
    type: 'select',
    label: getLabel(FORM_FIELD.GENDER),
    placeholder: 'Select your gender',
    options: [{ value: 'Male' }, { value: 'Female' }, { value: 'Other' }],
  },
  [FORM_FIELD.AGREEMENT]: {
    type: 'checkbox',
    label: getLabel(FORM_FIELD.AGREEMENT),
  },
  [FORM_FIELD.FILE]: {
    type: 'file',
    label: getLabel(FORM_FIELD.FILE),
    accept: 'image/png, image/jpeg',
  },
  [FORM_FIELD.COUNTRY]: {
    type: 'text',
    label: getLabel(FORM_FIELD.COUNTRY),
    options: [{ value: 'Canada' }, { value: 'Croatia' }, { value: 'Ukraine' }],
  },
};

const getRequiredMessage = (field: FORM_FIELD) =>
  `${formLabel[field]} is required`;

export type AppForm = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  country: string;
};

export type OptionItem = {
  value: string;
  label?: string;
};

export type UserInfo = Partial<AppForm>;

export const formSchema: ObjectSchema<AppForm> = object({
  [FORM_FIELD.NAME]: string().required(getRequiredMessage(FORM_FIELD.NAME)), //validate for first uppercased letter
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
    .min(8, 'Password must be at least 8 characters'),
  [FORM_FIELD.CONFIRM_PASSWORD]: string()
    .required(getRequiredMessage(FORM_FIELD.CONFIRM_PASSWORD))
    .oneOf([ref(FORM_FIELD.PASSWORD), ''], 'Passwords must match'),
  [FORM_FIELD.GENDER]: string().required(getRequiredMessage(FORM_FIELD.GENDER)),
  // [FORM_FIELD.FILE]: string().required(getRequiredMessage(FORM_FIELD.FILE)),
  [FORM_FIELD.AGREEMENT]: boolean()
    .default(false)
    .oneOf([true], 'You must accept the terms and conditions'),
  [FORM_FIELD.COUNTRY]: string().required(
    getRequiredMessage(FORM_FIELD.COUNTRY)
  ),
});

// export const tableLabel = {
//   [TABLE_LABEL.NAME]: 'First Name',
//   [TABLE_LABEL.AGE]: 'Age',
//   [TABLE_LABEL.EMAIL]: 'Email',
//   [TABLE_LABEL.GENDER]: 'Gender',
//   [TABLE_LABEL.COUNTRY]: 'Country',
// };

import { FORM_FIELD } from './form.enum';
import { getLabel } from './form-label.const';

export type FormFieldData = {
  type: string;
  label: string;
  placeholder?: string;
  options?: OptionItem[];
  accept?: string[];
  title?: string;
  required?: boolean;
};

export type OptionItem = {
  value: string;
  label?: string;
};

export type FormFieldMap = Record<string, FormFieldData>;

export const characterSet = '!@#$%^&*(),.?:{}|<>/~';
export const passwordTitle = `Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character from set ${characterSet}`;
export const formFieldMap: FormFieldMap = {
  [FORM_FIELD.NAME]: {
    type: 'text',
    label: getLabel(FORM_FIELD.NAME),
    placeholder: 'Enter your first name',
    required: true,
  },
  [FORM_FIELD.AGE]: {
    type: 'number',
    label: getLabel(FORM_FIELD.AGE),
    placeholder: 'Enter your age',
    required: true,
  },
  [FORM_FIELD.EMAIL]: {
    type: 'email',
    label: getLabel(FORM_FIELD.EMAIL),
    placeholder: 'Enter your email',
    required: true,
  },
  [FORM_FIELD.PASSWORD]: {
    type: 'password',
    label: getLabel(FORM_FIELD.PASSWORD),
    placeholder: 'Enter your password',
    title: passwordTitle,
    required: true,
  },
  [FORM_FIELD.CONFIRM_PASSWORD]: {
    type: 'password',
    label: getLabel(FORM_FIELD.CONFIRM_PASSWORD),
    placeholder: 'Confirm your password',
    title: `Passwords must match. ${passwordTitle}`,
    required: true,
  },
  [FORM_FIELD.GENDER]: {
    type: 'select',
    label: getLabel(FORM_FIELD.GENDER),
    placeholder: 'Select your gender',
    options: [{ value: 'Male' }, { value: 'Female' }, { value: 'Other' }],
    required: false,
  },
  [FORM_FIELD.AGREEMENT]: {
    type: 'checkbox',
    label: getLabel(FORM_FIELD.AGREEMENT),
    required: true,
  },
  [FORM_FIELD.FILE]: {
    type: 'file',
    label: getLabel(FORM_FIELD.FILE),
    accept: ['image/png', 'image/jpeg'],
    required: false,
  },
  [FORM_FIELD.COUNTRY]: {
    type: 'text',
    label: getLabel(FORM_FIELD.COUNTRY),
    options: [{ value: 'Canada' }, { value: 'Croatia' }, { value: 'Ukraine' }],
    required: false,
  },
};

import { FORM_FIELD } from './form.enum';

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

export const getRequiredMessage = (field: FORM_FIELD) =>
  `${formLabel[field]} is required`;

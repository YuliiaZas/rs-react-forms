import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AppForm, FORM_TYPE, UserInfo } from '@utils';

const emptyForm: AppForm = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  agreement: false,
  file: '',
  country: '',
};

interface UserInfoState {
  controlledForms: UserInfo[];
  uncontrolledForms: UserInfo[];
  lastSavedForm: {
    type: FORM_TYPE;
    id: number;
  } | null;
}

const initialState: UserInfoState = {
  controlledForms: [],
  uncontrolledForms: [],
  lastSavedForm: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setForm: (
      state,
      {
        payload: { id, formValue, formType },
      }: PayloadAction<{
        id: number | null;
        formValue: UserInfo;
        formType: FORM_TYPE;
      }>
    ) => {
      const type =
        formType === FORM_TYPE.CONTROLLED
          ? 'controlledForms'
          : 'uncontrolledForms';
      const formId = id !== null ? id : state[type].length;
      state[type][formId] = formValue;
      state.lastSavedForm = { type: formType, id: formId };
    },
    resetLastSavedForm: (state) => {
      state.lastSavedForm = null;
    },
  },
});

export const { setForm, resetLastSavedForm } = userInfoSlice.actions;

export default userInfoSlice.reducer;

export const getControlledForms = (state: RootState) =>
  state.userInfo.controlledForms;
export const getControlledForm = (state: RootState, id: number | null) => {
  if (id === null) {
    return emptyForm;
  }
  return state.userInfo.controlledForms[id] ?? emptyForm;
};

export const getUncontrolledForms = (state: RootState) =>
  state.userInfo.uncontrolledForms;
export const getUncontrolledForm = (state: RootState, id: number | null) => {
  if (id === null) {
    return emptyForm;
  }
  return state.userInfo.uncontrolledForms[id] ?? emptyForm;
};

export const getLastSavedForm = (state: RootState) =>
  state.userInfo.lastSavedForm;

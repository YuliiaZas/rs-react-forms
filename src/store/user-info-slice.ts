import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AppForm, UserInfo } from '@utils';

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
}

const initialState: UserInfoState = {
  controlledForms: [],
  uncontrolledForms: [],
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setControlledForm: (
      state,
      {
        payload: { id, formValue },
      }: PayloadAction<{ id: number | null; formValue: UserInfo }>
    ) => {
      const formId = id !== null ? id : state.controlledForms.length;
      state.controlledForms[formId] = formValue;
    },
    setUncontrolledForm: (
      state,
      {
        payload: { id, formValue },
      }: PayloadAction<{ id: number | null; formValue: UserInfo }>
    ) => {
      const formId = id !== null ? id : state.controlledForms.length;
      state.uncontrolledForms[formId] = formValue;
    },
  },
});

export const { setControlledForm, setUncontrolledForm } = userInfoSlice.actions;

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

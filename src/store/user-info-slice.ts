import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserInfo } from '@utils';

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
        payload: { id, formData },
      }: PayloadAction<{ id?: number; formData: UserInfo }>
    ) => {
      const formId = id || state.controlledForms.length;
      state.controlledForms[formId] = formData;
    },
    setUncontrolledForm: (
      state,
      {
        payload: { id, formData },
      }: PayloadAction<{ id?: number; formData: UserInfo }>
    ) => {
      const formId = id || state.uncontrolledForms.length;
      state.uncontrolledForms[formId] = formData;
    },
  },
});

export const { setControlledForm, setUncontrolledForm } = userInfoSlice.actions;

export default userInfoSlice.reducer;

export const getControlledForms = (state: RootState) =>
  state.userInfo.controlledForms;
export const getControlledForm = (state: RootState, id: number) =>
  state.userInfo.controlledForms[id];

export const getUncontrolledForms = (state: RootState) =>
  state.userInfo.uncontrolledForms;
export const getUncontrolledForm = (state: RootState, id: number) =>
  state.userInfo.uncontrolledForms[id];

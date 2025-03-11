import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserInfoState {
  controlledForm: object;
  uncontrolledForm: object;
}

const initialState: UserInfoState = {
  controlledForm: {},
  uncontrolledForm: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setControlledForm: (state, { payload }: PayloadAction<object>) => {
      state.controlledForm = payload;
    },
    setUncontrolledForm: (state, { payload }: PayloadAction<object>) => {
      state.uncontrolledForm = payload;
    },
  },
});

export const { setControlledForm, setUncontrolledForm } = userInfoSlice.actions;

export default userInfoSlice.reducer;

export const getControlledForm = (state: RootState) =>
  state.userInfo.controlledForm;
export const getUncontrolledForm = (state: RootState) =>
  state.userInfo.uncontrolledForm;

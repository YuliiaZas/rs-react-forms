import { configureStore } from '@reduxjs/toolkit';
import { countriesApiSlice } from './countries-api-slice';
import countriesSliceReducer from './countries-slice';

export const store = configureStore({
  reducer: {
    countries: countriesSliceReducer,
    [countriesApiSlice.reducerPath]: countriesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

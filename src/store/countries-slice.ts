import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@utils';
import { RootState } from './store';

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, { payload }: PayloadAction<Country[]>) => {
      state.countries = payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;

export const getCountries = (state: RootState) => state.countries.countries;

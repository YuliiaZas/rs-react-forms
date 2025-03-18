import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, Sort, SORT_BY, SORT_ORDER } from '@utils';
import { RootState } from './store';

interface CountriesState {
  countries: Country[];
  regions: string[];
  region: string;
  search: string;
  sorting: Sort;
}

const initialState: CountriesState = {
  countries: [],
  regions: [],
  region: '',
  search: '',
  sorting: { key: SORT_BY.DEFAULT, order: SORT_ORDER.DEFAULT },
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, { payload }: PayloadAction<Country[]>) => {
      state.countries = payload;
      state.regions = Array.from(
        new Set(payload.map((country) => country.region))
      );
    },
    setRegion: (state, { payload }: PayloadAction<string>) => {
      state.region = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setSorting: (state, { payload }: PayloadAction<Sort>) => {
      state.sorting = payload;
    },
  },
});

export const { setCountries, setRegion, setSearch, setSorting } =
  countriesSlice.actions;

export default countriesSlice.reducer;

export const getCountries = (state: RootState) => state.countries.countries;
export const getRegions = (state: RootState) => state.countries.regions;
export const getRegion = (state: RootState) => state.countries.region;
export const getSearch = (state: RootState) => state.countries.search;
export const getSorting = (state: RootState) => state.countries.sorting;

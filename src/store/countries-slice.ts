import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, DEFAULT, Sort } from '@utils';
import { RootState } from './store';

interface CountriesState {
  countries: Country[];
  regions: string[];
  selectedRegionState: Record<string, boolean>;
  search: string;
  sorting: Sort;
}

const initialState: CountriesState = {
  countries: [],
  regions: [],
  selectedRegionState: {},
  search: '',
  sorting: { key: DEFAULT, order: DEFAULT },
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
      state.selectedRegionState = state.regions.reduce(
        (acc, region) => ({ ...acc, [region]: true }),
        {}
      );
    },
    setSelectedRegionState: (
      state,
      { payload }: PayloadAction<Record<string, boolean>>
    ) => {
      state.selectedRegionState = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setSorting: (state, { payload }: PayloadAction<Sort>) => {
      state.sorting = payload;
    },
  },
});

export const { setCountries, setSelectedRegionState, setSearch, setSorting } =
  countriesSlice.actions;

export default countriesSlice.reducer;

export const getCountries = (state: RootState) => state.countries.countries;
export const getRegions = (state: RootState) => state.countries.regions;
export const getSelectedRegionState = (state: RootState) =>
  state.countries.selectedRegionState;
export const getSearch = (state: RootState) => state.countries.search;
export const getSorting = (state: RootState) => state.countries.sorting;

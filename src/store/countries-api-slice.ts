import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from '@utils';
import { setCountries } from './countries-slice';

export const countriesApiSlice = createApi({
  reducerPath: '/api/countries',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://restcountries.com/v3.1/independent?fields=name,flag,population,region',
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query<Country[], void>({
      query: () => '',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let attempts = 5;
        while (attempts > 0) {
          try {
            dispatch(setCountries((await queryFulfilled).data));
            return;
          } catch (error) {
            attempts -= 1;
            if (attempts === 0) {
              console.error(
                `Failed to fetch countries ${attempts} times:`,
                error
              );
            }
          }
        }
      },
    }),
  }),
});

export const { useFetchCountriesQuery } = countriesApiSlice;

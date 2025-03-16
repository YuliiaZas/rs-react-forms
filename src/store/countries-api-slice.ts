import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CountryRaw, defaultCountries } from '@utils';
import { setCountries } from './countries-slice';

export const countriesApiSlice = createApi({
  reducerPath: '/api/countries',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://restcountries.com/v3.1/independent?status=true&fields=name,flag',
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query<CountryRaw[], void>({
      query: () => '',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let attempts = 5;
        while (attempts > 0) {
          try {
            const data = (await queryFulfilled).data.map(({ name, flag }) => ({
              name: name.common,
              flag,
            }));
            dispatch(setCountries(data));
            return;
          } catch (error) {
            attempts -= 1;
            if (attempts === 0) {
              console.error(
                `Failed to fetch countries ${attempts} times:`,
                error
              );
              dispatch(setCountries(defaultCountries));
            }
          }
        }
      },
    }),
  }),
});

export const { useFetchCountriesQuery } = countriesApiSlice;

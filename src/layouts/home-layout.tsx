import { useAppSelector } from '@hooks';
import { getCountries, useFetchCountriesQuery } from '@store';
import { ReactNode } from 'react';

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  const countries = useAppSelector((state) => getCountries(state));
  useFetchCountriesQuery(undefined, { skip: !!countries.length });
  return <div>{children}</div>;
};

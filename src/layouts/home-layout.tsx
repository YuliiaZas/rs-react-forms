import { useAppSelector } from '@hooks';
import { getCountries, useFetchCountriesQuery } from '@store';
// import { ReactNode } from 'react';
import { Outlet } from 'react-router';

// export const HomeLayout = ({ children }: { children: ReactNode }) => {
export const HomeLayout = () => {
  const countries = useAppSelector((state) => getCountries(state));
  useFetchCountriesQuery(undefined, { skip: !!countries.length });
  // return <div>{children}</div>;
  return <Outlet />;
};

import { useAppSelector } from '@hooks';
import { getCountries, useFetchCountriesQuery } from '@store';
import { Outlet } from 'react-router';

export const HomePage = () => {
  const countries = useAppSelector((state) => getCountries(state));
  useFetchCountriesQuery(undefined, { skip: !!countries.length });

  return (
    <div>
      HomePage {countries.length}
      <Outlet />
    </div>
  );
};

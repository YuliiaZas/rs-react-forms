import { useAppSelector } from '@hooks';
import { getCountries, useFetchCountriesQuery } from '@store';
import { FormsList } from '@lib';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router';
import { PATH_VALUE } from '@utils';

export const HomePage = () => {
  const countries = useAppSelector((state) => getCountries(state));
  useFetchCountriesQuery(undefined, { skip: !!countries.length });
  const location = useLocation();

  return (
    <div>
      {location.pathname === PATH_VALUE.HOME && <FormsList />}
      <Outlet />
    </div>
  );
};

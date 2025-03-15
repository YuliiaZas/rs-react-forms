import { useAppSelector } from '@hooks';
import { getCountries, useFetchCountriesQuery } from '@store';
import { FormsList } from '@lib';
import { useLocation } from 'react-router';
import { Outlet, useSearchParams } from 'react-router';
import { PATH_VALUE } from '@utils';

export const HomePage = () => {
  const countries = useAppSelector((state) => getCountries(state));
  useFetchCountriesQuery(undefined, { skip: !!countries.length });
  const [searchParams] = useSearchParams();
  const location = useLocation();

  return (
    <div>
      HomePage {countries.length} {location.pathname} {searchParams.toString()}
      {location.pathname === PATH_VALUE.HOME && <FormsList />}
      <Outlet />
    </div>
  );
};

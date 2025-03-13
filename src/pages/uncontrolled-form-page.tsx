import { useAppSelector } from '@hooks';
import { getCountries } from '@store';

export const UncontrolledFormPage = () => {
  const countries = useAppSelector((state) => getCountries(state));

  return <div>UncontrolledFormPage {countries.length}</div>;
};

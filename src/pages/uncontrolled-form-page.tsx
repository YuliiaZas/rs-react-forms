import { useAppSelector } from '@hooks';
import { getCountries } from '@store';

export const ControlledFormPage = () => {
  const countries = useAppSelector((state) => getCountries(state));

  return <div>ControlledFormPage {countries.length}</div>;
};

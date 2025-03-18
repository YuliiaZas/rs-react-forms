import { useAppSelector } from '@hooks';
import { CardSmall } from '@lib';
import { getCountries } from '@store';
import { Country, KeyValuePair } from '@utils';

export const CountryList = () => {
  const contries = useAppSelector((state) => getCountries(state));

  const getDetails = (country: Country): KeyValuePair[] => {
    return [
      { key: 'Flag', value: country.flag },
      { key: 'Region', value: country.region },
      { key: 'Population', value: country.population.toString() },
    ];
  };

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {contries.map((country) => (
          <li key={country.name.common}>
            <CardSmall
              cardTitle={country.name.common}
              listOfDetails={getDetails(country)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

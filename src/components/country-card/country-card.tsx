import { CardSmall } from '@lib';
import { Country } from '@utils';
import { memo, useMemo } from 'react';

type CountryCardProps = {
  country: Country;
  likedCountries: string[];
};

export const CountryCard = memo(function CountryCard({
  country,
  likedCountries,
}: CountryCardProps) {
  const details = useMemo(() => {
    console.log('getDetails', country);
    return [
      { key: 'Flag', value: country.flag },
      { key: 'Region', value: country.region },
      { key: 'Population', value: country.population.toLocaleString() },
    ];
  }, [country]);

  const isCountryLiked = useMemo(() => {
    console.log('isCountryLiked', likedCountries.includes(country.name.common));
    return likedCountries.includes(country.name.common);
  }, [country.name.common, likedCountries]);

  return (
    <CardSmall
      cardTitle={country.name.common}
      listOfDetails={details}
      isSelected={isCountryLiked}
    />
  );
});

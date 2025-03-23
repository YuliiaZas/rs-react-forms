import { CardSmall } from '@lib';
import { Country } from '@utils';
import { memo, useMemo } from 'react';

type CountryCardProps = {
  country: Country;
  isLiked: boolean;
};

export const CountryCard = memo(function CountryCard({
  country,
  isLiked,
}: CountryCardProps) {
  const details = useMemo(() => {
    console.log('getDetails', country);
    return [
      { key: 'Flag', value: country.flag },
      { key: 'Region', value: country.region },
      { key: 'Population', value: country.population.toLocaleString() },
    ];
  }, [country]);

  return (
    <CardSmall
      cardTitle={country.name.common}
      listOfDetails={details}
      isSelected={isLiked}
    />
  );
});

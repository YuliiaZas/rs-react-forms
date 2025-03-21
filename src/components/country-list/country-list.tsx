import { useAppSelector, useLocalStorage } from '@hooks';
import { CardSmall } from '@lib';
import {
  getCountries,
  getSearch,
  getSelectedRegionState,
  getSorting,
} from '@store';
import {
  Country,
  DEFAULT,
  KeyValuePair,
  Sort,
  SORT_BY,
  SORT_ORDER,
} from '@utils';
import { useEffect, useState } from 'react';

export const CountryList = () => {
  const contries = useAppSelector((state) => getCountries(state));
  const selectedRegionsState = useAppSelector((state) =>
    getSelectedRegionState(state)
  );
  const searchValue: string = useAppSelector((state) => getSearch(state));
  const selectedSorting: Sort = useAppSelector((state) => getSorting(state));

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);

  const [likedCountries, setLikedCountries] = useLocalStorage<string[]>({
    key: 'likedCountries',
    defaultValue: [],
  });

  useEffect(() => {
    const newFilteredCountries = contries.filter((country) => {
      return (
        selectedRegionsState[country.region] &&
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredCountries(newFilteredCountries);
  }, [contries, selectedRegionsState, searchValue]);

  useEffect(() => {
    const newSortedCountries =
      selectedSorting.key === DEFAULT
        ? [...filteredCountries]
        : [...filteredCountries].sort((a, b) => {
            const valueA =
              selectedSorting.key === SORT_BY.NAME
                ? a.name.common
                : a.population;
            const valueB =
              selectedSorting.key === SORT_BY.NAME
                ? b.name.common
                : b.population;
            if (valueA < valueB) {
              return selectedSorting.order === SORT_ORDER.ASC ? -1 : 1;
            }
            if (valueA > valueB) {
              return selectedSorting.order === SORT_ORDER.ASC ? 1 : -1;
            }
            return 0;
          });
    setSortedCountries(newSortedCountries);
  }, [filteredCountries, selectedSorting]);

  const getDetails = (country: Country): KeyValuePair[] => {
    return [
      { key: 'Flag', value: country.flag },
      { key: 'Region', value: country.region },
      { key: 'Population', value: country.population.toLocaleString() },
    ];
  };

  const handleCardClick = (country: Country) => {
    const newState = getIsCountryLiked(country)
      ? likedCountries.filter((name) => name !== country.name.common)
      : [...likedCountries, country.name.common];
    setLikedCountries(newState);
  };

  const getIsCountryLiked = (country: Country) => {
    return likedCountries.includes(country.name.common);
  };

  return (
    <div>
      <h1>Country List</h1>
      <ul className="list">
        {sortedCountries.map((country) => (
          <li
            className="list mb-3"
            key={country.name.common}
            onClick={() => handleCardClick(country)}
          >
            <CardSmall
              cardTitle={country.name.common}
              listOfDetails={getDetails(country)}
              isSelected={getIsCountryLiked(country)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

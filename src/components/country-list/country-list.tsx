import { CountryCard } from '@components';
import { useAppSelector, useLocalStorage } from '@hooks';
import {
  getCountries,
  getSearch,
  getSelectedRegionState,
  getSorting,
} from '@store';
import { Country, DEFAULT, Sort, SORT_BY, SORT_ORDER } from '@utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const CountryList = () => {
  const contries = useAppSelector((state) => getCountries(state));
  const selectedRegionsState = useAppSelector((state) =>
    getSelectedRegionState(state)
  );
  const searchValue: string = useAppSelector((state) => getSearch(state));
  const selectedSorting: Sort = useAppSelector((state) => getSorting(state));

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);

  const [likedCountries, setLikedCountries] = useLocalStorage<
    Record<string, boolean>
  >({
    key: 'likedCountries',
    defaultValue: {},
  });

  const newFilteredCountries = useMemo(() => {
    return contries.filter((country) => {
      return (
        selectedRegionsState[country.region] &&
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [contries, selectedRegionsState, searchValue]);

  useEffect(() => {
    setFilteredCountries(newFilteredCountries);
  }, [newFilteredCountries]);

  const newSortedCountries = useMemo(() => {
    return selectedSorting.key === DEFAULT
      ? [...filteredCountries]
      : [...filteredCountries].sort((a, b) => {
          const valueA =
            selectedSorting.key === SORT_BY.NAME ? a.name.common : a.population;
          const valueB =
            selectedSorting.key === SORT_BY.NAME ? b.name.common : b.population;
          if (valueA < valueB) {
            return selectedSorting.order === SORT_ORDER.ASC ? -1 : 1;
          }
          if (valueA > valueB) {
            return selectedSorting.order === SORT_ORDER.ASC ? 1 : -1;
          }
          return 0;
        });
  }, [filteredCountries, selectedSorting]);

  useEffect(() => {
    setSortedCountries(newSortedCountries);
  }, [newSortedCountries]);

  const handleCardClick = useCallback(
    (country: Country) => {
      const newState = {
        ...likedCountries,
        [country.name.common]: !likedCountries[country.name.common],
      };
      setLikedCountries(newState);
    },
    [likedCountries, setLikedCountries]
  );

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
            <CountryCard
              country={country}
              isLiked={likedCountries[country.name.common]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

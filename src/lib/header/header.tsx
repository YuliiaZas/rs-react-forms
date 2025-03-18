import { useAppDispatch } from '@hooks';
import { Search } from '@lib';
import { setSearch } from '@store';

export const Header = () => {
  const dispatch = useAppDispatch();

  const updateSearchValue = (searchValue: string) => {
    dispatch(setSearch(searchValue));
  };

  return (
    <header>
      <Search
        initialSearchValue={''}
        updateSearchValue={updateSearchValue}
        placeholder={'Type a country name'}
      />
    </header>
  );
};

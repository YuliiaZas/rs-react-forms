import { useAppDispatch, useAppSelector } from '@hooks';
import { Dropdown, DropdownMultiple, Search } from '@lib';
import {
  getRegions,
  getSearch,
  getSelectedRegionState,
  getSorting,
  setSearch,
  setSelectedRegionState,
  setSorting,
} from '@store';
import {
  sorting,
  DropdownItem,
  getSortingValue,
  getSortingFromValue,
  Sort,
  getSortingLabel,
  getOrderLabel,
} from '@utils';

export const CountrySettings = () => {
  const allTitle = 'All';
  const dispatch = useAppDispatch();

  const regions: DropdownItem[] = useAppSelector((state) =>
    getRegions(state)
  ).map((region) => ({
    label: region,
    value: region,
  }));
  const selectedRegionsState = useAppSelector((state) =>
    getSelectedRegionState(state)
  );
  const selectedRegionsNumber = regions.filter(
    (region) => selectedRegionsState[region.value]
  ).length;

  const sortingItems: DropdownItem[] = sorting.map((sort) => ({
    label: getSortingLabel(sort),
    value: getSortingValue(sort),
  }));
  const selectedSorting: Sort = useAppSelector((state) => getSorting(state));
  const selectedSortingValue: string = getSortingValue(selectedSorting);

  const searchValue: string = useAppSelector((state) => getSearch(state));

  const updateSearchValue = (searchValue: string) => {
    dispatch(setSearch(searchValue));
  };

  const updateRegions = (selectedRegionState: Record<string, boolean>) => {
    dispatch(setSelectedRegionState(selectedRegionState));
  };

  const updateSorting = (sortingValue: string) => {
    dispatch(setSorting(getSortingFromValue(sortingValue)));
  };

  return (
    <div className="d-flex position-relative">
      <div className="mr-2" style={{ minWidth: '140px', textAlign: 'left' }}>
        <DropdownMultiple
          items={regions}
          selectedItems={selectedRegionsState}
          showAll={true}
          allTitle={allTitle}
          selectOptions={updateRegions}
        >
          <span>
            <span className="mr-1">Regions:</span>
            <span>
              {selectedRegionsNumber === regions.length
                ? allTitle
                : selectedRegionsNumber}
            </span>
          </span>
        </DropdownMultiple>
      </div>
      <Search
        initialSearchValue={searchValue}
        updateSearchValue={updateSearchValue}
        placeholder={'Type a country name'}
      />
      <div style={{ marginLeft: 'auto' }}>
        <Dropdown
          items={sortingItems}
          selectedItem={selectedSortingValue}
          selectOption={updateSorting}
          positionedRigth={true}
        >
          <span>
            <span className="mr-1">Sort:</span>
            <span>{selectedSorting.key}</span>{' '}
            <span>{getOrderLabel(selectedSorting)}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

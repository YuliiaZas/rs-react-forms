import { DEFAULT } from './default';
import { Sort, SORT_BY, SORT_ORDER } from './sort.type';

export const sorting: Sort[] = [
  { key: DEFAULT, order: DEFAULT },
  { key: SORT_BY.NAME, order: SORT_ORDER.ASC },
  { key: SORT_BY.NAME, order: SORT_ORDER.DESC },
  { key: SORT_BY.POPULATION, order: SORT_ORDER.ASC },
  { key: SORT_BY.POPULATION, order: SORT_ORDER.DESC },
];

export const getOrderLabel = (sort: Sort) => {
  const { key, order } = sort;
  if (order === DEFAULT) {
    return '';
  }
  const min = key === SORT_BY.NAME ? 'A' : '0';
  const max = key === SORT_BY.NAME ? 'Z' : '9';

  return order === SORT_ORDER.ASC ? `${min} -> ${max}` : `${max} -> ${min}`;
};

export const getSortingLabel = (sort: Sort) =>
  `${sort.key} ${getOrderLabel(sort)}`;

export const getSortingValue = (sort: Sort) => `${sort.key}-${sort.order}`;

export const getSortingFromValue = (value: string): Sort => {
  const [key, order] = value.split('-') as [
    SORT_BY | typeof DEFAULT,
    SORT_ORDER | typeof DEFAULT,
  ];
  return { key, order };
};

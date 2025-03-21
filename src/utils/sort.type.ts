import { DEFAULT } from './default';
export enum SORT_BY {
  NAME = 'Name',
  POPULATION = 'Population',
}

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export type Sort = {
  key: SORT_BY | typeof DEFAULT;
  order: SORT_ORDER | typeof DEFAULT;
};

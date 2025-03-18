export enum SORT_BY {
  NAME = 'name',
  POPULATION = 'population',
  DEFAULT = 'default',
}

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default',
}

export type Sort = {
  key: SORT_BY;
  order: SORT_ORDER;
};

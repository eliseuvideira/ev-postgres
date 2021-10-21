import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";

export type Exists<T> = (
  database: Knex,
  filter?: FilterProps<T>
) => Promise<boolean>;

export const createExists =
  <T>(
    count: (database: Knex, filter: FilterProps<T>) => Promise<number>
  ): Exists<T> =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    const totalCount = await count(database, filter);

    return totalCount > 0;
  };

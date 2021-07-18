import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";

export const createExists =
  <T>(count: (database: Knex, filter: FilterProps<T>) => Promise<number>) =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    const totalCount = await count(database, filter);

    return totalCount > 0;
  };

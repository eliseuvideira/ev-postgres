import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type Delete<T> = (
  database: Knex,
  filter?: FilterProps<T>
) => Promise<void>;

export const createDelete =
  <T>(
    table: string,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): Delete<T> =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    await query(database).modify(parseFilter(filter)).delete();
  };

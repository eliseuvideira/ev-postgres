import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type Count<T> = (
  database: Knex,
  filter?: FilterProps<T>
) => Promise<number>;

export const createCount =
  <T>(
    table: string,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): Count<T> =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    const { count } = await query(database)
      .modify(parseFilter(filter))
      .clearSelect()
      .count()
      .first();

    return +count;
  };

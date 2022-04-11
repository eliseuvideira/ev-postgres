import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type Update<T> = (
  database: Knex,
  filter: FilterProps<T>,
  values: Partial<T>
) => Promise<T[]>;

export const createUpdate =
  <T>(
    table: string,
    query: (database: Knex) => Knex.QueryBuilder = (database) =>
      database.from(table)
  ): Update<T> =>
  async (database: Knex, filter: FilterProps<T>, values: Partial<T>) => {
    const rows: any[] = await query(database)
      .modify(parseFilter(filter))
      .update(values)
      .returning("*");

    return rows as T[];
  };

import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type Update<T> = (
  database: Knex,
  filter: FilterProps<T>,
  values: Partial<T>
) => Promise<T[]>;

export const createUpdate =
  <T>(table: string): Update<T> =>
  async (database: Knex, filter: FilterProps<T>, values: Partial<T>) => {
    const rows: any[] = await database
      .from(table)
      .modify(parseFilter(filter))
      .update(values)
      .returning("*");

    return rows as T[];
  };

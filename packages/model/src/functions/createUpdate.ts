import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export const createUpdate =
  <T>(table: string) =>
  async (database: Knex, filter: FilterProps<T>, values: Partial<T>) => {
    const rows: any[] = await database
      .from(table)
      .modify(parseFilter(filter))
      .update(values)
      .returning("*");

    return rows as T[];
  };

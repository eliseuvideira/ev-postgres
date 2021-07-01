import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export const createFindOne =
  <T>(table: string) =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    const row: any = await database
      .from(table)
      .modify(parseFilter(filter))
      .first();

    if (!row) {
      return null;
    }

    return row as T;
  };

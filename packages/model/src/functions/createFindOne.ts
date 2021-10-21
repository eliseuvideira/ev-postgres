import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type FindOne<T> = (
  database: Knex,
  filter?: FilterProps<T>
) => Promise<T | null>;

export const createFindOne =
  <T>(table: string): FindOne<T> =>
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

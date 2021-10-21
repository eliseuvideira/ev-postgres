import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export type Delete<T> = (
  database: Knex,
  filter?: FilterProps<T>
) => Promise<void>;

export const createDelete =
  <T>(table: string): Delete<T> =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    await database.from(table).modify(parseFilter(filter)).delete();
  };

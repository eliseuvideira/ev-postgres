import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export const createDelete =
  <T>(table: string) =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    await database.from(table).modify(parseFilter(filter)).delete();
  };

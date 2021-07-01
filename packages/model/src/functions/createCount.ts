import { Knex } from "knex";
import { FilterProps } from "../types/FilterProps";
import { parseFilter } from "./parseFilter";

export const createCount =
  <T>(table: string) =>
  async (database: Knex, filter: FilterProps<T> = {}) => {
    const { count } = await database
      .from(table)
      .modify(parseFilter(filter))
      .count()
      .first();

    return +count;
  };

import { Knex } from "knex";
import { SortableFilterProps } from "../types/SortableFilterProps";
import { parseFilter } from "./parseFilter";

export type Find<T> = (
  database: Knex,
  filter?: SortableFilterProps<T>
) => Promise<T[]>;

export const createFind =
  <T>(table: string): Find<T> =>
  async (database: Knex, filter: SortableFilterProps<T> = {}) => {
    const rows: any[] = await database.from(table).modify(parseFilter(filter));

    return rows as T[];
  };

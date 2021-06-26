import { FindOneProps } from "../types/FindOneProps";
import { parseFilter } from "./parseFilter";

interface CreateFindOneProps {
  table: string;
}

export const createFindOne =
  <T>({ table }: CreateFindOneProps) =>
  async ({ database, filter = {} }: FindOneProps<T>) => {
    const row: any | null = await database
      .from(table)
      .modify(parseFilter(filter))
      .first();

    if (!row) {
      return null;
    }

    return row as T;
  };

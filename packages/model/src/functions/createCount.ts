import { FindProps } from "../types/FindProps";
import { parseFilter } from "./parseFilter";

interface CreateCountProps {
  table: string;
}

export const createCount =
  <T>({ table }: CreateCountProps) =>
  async ({ database, filter = {} }: FindProps<T>) => {
    const { count } = await database
      .from(table)
      .modify(parseFilter(filter))
      .count()
      .first();

    return +count;
  };

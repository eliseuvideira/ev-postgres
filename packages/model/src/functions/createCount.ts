import { CountProps } from "../types/functions/CountProps";
import { parseFilter } from "./parseFilter";

interface CreateCountProps {
  table: string;
}

export const createCount =
  <T>({ table }: CreateCountProps) =>
  async ({ database, filter = {} }: CountProps<T>) => {
    const { count } = await database
      .from(table)
      .modify(parseFilter(filter))
      .count()
      .first();

    return +count;
  };

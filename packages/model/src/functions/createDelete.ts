import { DeleteProps } from "../types/functions/DeleteProps";
import { parseFilter } from "./parseFilter";

interface CreateDeleteProps {
  table: string;
}

export const createDelete =
  <T>({ table }: CreateDeleteProps) =>
  async ({ database, filter = {} }: DeleteProps<T>) => {
    await database.from(table).modify(parseFilter(filter)).delete();
  };

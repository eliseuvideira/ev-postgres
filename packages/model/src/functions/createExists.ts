import { CountProps } from "../types/functions/CountProps";
import { ExistsProps } from "../types/functions/ExistsProps";

export const createExists =
  <T>(count: ({ database, filter }: CountProps<T>) => Promise<number>) =>
  async ({ database, filter = {} }: ExistsProps<T>) => {
    const totalCount = await count({ database, filter });

    return totalCount > 0;
  };

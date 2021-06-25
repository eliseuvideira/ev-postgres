import { CountProps } from "../types/CountProps";
import { ExistsProps } from "../types/ExistsProps";

export const createExists =
  <T>(count: ({ database, filter }: CountProps<T>) => Promise<number>) =>
  async ({ database, filter = {} }: ExistsProps<T>) => {
    const totalCount = await count({ database, filter });

    return totalCount > 0;
  };

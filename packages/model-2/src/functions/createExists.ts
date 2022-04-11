import { Count } from "../types/Count";
import { Exists, ExistsProps } from "../types/Exists";

export interface CreateExistsProps<Props> {
  count: Count<Props>;
}

export const createExists =
  <Props>({ count }: CreateExistsProps<Props>): Exists<Props> =>
  async ({
    database,
    filter,
    modify,
  }: ExistsProps<Props>): Promise<boolean> => {
    const totalCount = await count({ database, filter, modify });

    return totalCount > 0;
  };

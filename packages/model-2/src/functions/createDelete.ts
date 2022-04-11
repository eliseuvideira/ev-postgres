import { Delete, DeleteProps } from "../types/Delete";
import { Source } from "../types/Source";
import { parseFilter } from "./parseFilter";

export interface CreateDeleteProps {
  source: Source;
}

export const createDelete =
  <Props>({ source }: CreateDeleteProps): Delete<Props> =>
  async ({ database, filter, modify }: DeleteProps<Props>): Promise<void> => {
    const query = source(database);

    if (filter) {
      query.modify(parseFilter(filter));
    }

    if (modify) {
      query.modify(modify);
    }

    await query.delete();
  };

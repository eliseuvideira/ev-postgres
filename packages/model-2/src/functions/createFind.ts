import { Find, FindProps } from "../types/Find";
import { Source } from "../types/Source";
import { parseFilter } from "./parseFilter";

export interface CreateFindProps {
  source: Source;
}

export const createFind =
  <Props>({ source }: CreateFindProps): Find<Props> =>
  async ({ database, filter, modify }: FindProps<Props>): Promise<Props[]> => {
    const query = source(database);

    if (filter) {
      query.modify(parseFilter(filter));
    }

    if (modify) {
      query.modify(modify);
    }

    const rows: any[] = await query;

    return rows as Props[];
  };

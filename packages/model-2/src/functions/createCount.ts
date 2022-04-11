import { Count, CountProps } from "../types/Count";
import { Source } from "../types/Source";
import { parseFilter } from "./parseFilter";

export interface CreateCountProps {
  source: Source;
}

export const createCount =
  <Props>({ source }: CreateCountProps): Count<Props> =>
  async ({ database, filter, modify }: CountProps<Props>): Promise<number> => {
    const query = source(database);

    if (filter) {
      query.modify(parseFilter(filter));
    }

    if (modify) {
      query.modify(modify);
    }

    const { count } = await query.count().first();

    return +count;
  };

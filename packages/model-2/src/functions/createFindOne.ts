import { FindOne, FindOneProps } from "../types/FindOne";
import { Source } from "../types/Source";
import { parseFilter } from "./parseFilter";

export interface CreateFindOneProps {
  source: Source;
}

export const createFindOne =
  <Props>({ source }: CreateFindOneProps): FindOne<Props> =>
  async ({
    database,
    filter,
    modify,
  }: FindOneProps<Props>): Promise<Props | null> => {
    const query = source(database);

    if (filter) {
      query.modify(parseFilter(filter));
    }

    if (modify) {
      query.modify(modify);
    }

    const row: unknown = await query.first();

    if (!row) {
      return null;
    }

    return row as Props;
  };

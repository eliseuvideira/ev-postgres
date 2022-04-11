import { Insert, InsertProps } from "../types/Insert";
import { Source } from "../types/Source";

export interface CreateInsertProps {
  source: Source;
}

export const createInsert =
  <Props>({ source }: CreateInsertProps): Insert<Props> =>
  async ({ database, items, modify }: InsertProps<Props>): Promise<Props[]> => {
    if (items.length === 0) {
      return [];
    }

    const query = source(database).insert(items);

    if (modify) {
      query.modify(modify);
    }

    const rows = await query.returning("*");

    return rows as Props[];
  };

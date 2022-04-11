import { InsertOne, InsertOneProps } from "../types/InsertOne";
import { Source } from "../types/Source";

export interface CreateInsertOneProps {
  source: Source;
}

export const createInsertOne =
  <Props>({ source }: CreateInsertOneProps): InsertOne<Props> =>
  async ({ database, item, modify }: InsertOneProps<Props>) => {
    const query = source(database).insert(item);

    if (modify) {
      query.modify(modify);
    }

    const [row] = await query.returning("*");

    return row as Props;
  };

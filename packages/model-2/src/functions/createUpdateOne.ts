import { Strip } from "../types/Strip";
import { Source } from "../types/Source";
import { UpdateOne, UpdateOneProps } from "../types/UpdateOne";

export interface CreateUpdateOneProps<Primary> {
  source: Source;
  strip: Strip<Primary>;
}

export const createUpdateOne =
  <Props, Primary extends Partial<Props>>({
    source,
    strip,
  }: CreateUpdateOneProps<Primary>): UpdateOne<Props, Primary> =>
  async ({
    database,
    primary,
    values,
    modify,
  }: UpdateOneProps<Props, Primary>): Promise<Props | null> => {
    const query = source(database).where(strip(primary)).update(values);

    if (modify) {
      query.modify(modify);
    }

    const [row]: unknown[] = await query.returning("*");

    if (!row) {
      return null;
    }

    return row as Props;
  };

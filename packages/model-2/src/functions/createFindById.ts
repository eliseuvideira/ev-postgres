import { FindById, FindByIdProps } from "../types/FindById";
import { Strip } from "../types/Strip";
import { Source } from "../types/Source";

export interface CreateFindByIdProps<Primary> {
  source: Source;
  strip: Strip<Primary>;
}

export const createFindById =
  <Props, Primary>({
    source,
    strip,
  }: CreateFindByIdProps<Primary>): FindById<Props, Primary> =>
  async ({
    database,
    primary,
    modify,
  }: FindByIdProps<Primary>): Promise<Props | null> => {
    const query = source(database).where(strip(primary));

    if (modify) {
      query.modify(modify);
    }

    const row: unknown = await query.first();

    if (!row) {
      return null;
    }

    return row as Props;
  };

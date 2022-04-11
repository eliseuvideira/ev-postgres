import { Source } from "../types/Source";
import { Update, UpdateProps } from "../types/Update";
import { parseFilter } from "./parseFilter";

export interface CreateUpdateProps {
  source: Source;
}

export const createUpdate =
  <Props>({ source }: CreateUpdateProps): Update<Props> =>
  async ({ database, filter, values, modify }: UpdateProps<Props>) => {
    const query = source(database).modify(parseFilter(filter)).update(values);

    if (modify) {
      query.modify(modify);
    }

    const rows: unknown[] = await query.returning("*");

    return rows as Props[];
  };

import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";
import { parseObject } from "./parseObject";

export interface CreateCheckExistsOrThrowErrorProps<T, TPrimary> {
  model: string;
  Model: ModelProps<T, TPrimary>;
  InputError: typeof Error;
  formatError: (props: { model: string; identifier: string }) => string;
}

export const createCheckExistsOrThrowError =
  <T, TPrimary>({
    model,
    Model,
    InputError,
    formatError,
  }: CreateCheckExistsOrThrowErrorProps<T, TPrimary>) =>
  async (database: Knex, item: Partial<T>) => {
    const exists = await Model.exists(database, { $eq: { ...item } });

    if (!exists) {
      const identifier = parseObject({ ...item });

      throw new InputError(formatError({ model, identifier }));
    }
  };

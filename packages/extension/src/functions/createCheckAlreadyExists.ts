import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { Knex } from "knex";
import { parseObject } from "./parseObject";

export interface CreateCheckAlreadyExistsOrThrowErrorProps<T, TPrimary> {
  model: string;
  Model: ModelProps<T, TPrimary>;
  InputError: typeof Error;
  primary: (item: T) => TPrimary;
  formatError: (props: {
    model: string;
    identifier: string;
    duplicate: T;
    duplicateIdentifier: string;
  }) => string;
}

export const createCheckAlreadyExistsOrThrowError =
  <T, TPrimary>({
    model,
    Model,
    InputError,
    primary,
    formatError,
  }: CreateCheckAlreadyExistsOrThrowErrorProps<T, TPrimary>) =>
  async (database: Knex, item: Partial<T>) => {
    const duplicate = await Model.findOne(database, { $eq: { ...item } });

    if (duplicate) {
      const identifier = parseObject({ ...item });

      const duplicateIdentifier = parseObject(primary(duplicate));

      throw new InputError(
        formatError({ model, identifier, duplicate, duplicateIdentifier })
      );
    }
  };

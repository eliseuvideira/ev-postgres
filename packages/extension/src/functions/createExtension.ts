import { ModelProps } from "@ev-postgres/model/lib/functions/createModel";
import { createCheckAlreadyExists } from "./createCheckAlreadyExists";
import { createCheckAlreadyExistsMany } from "./createCheckAlreadyExistsMany";
import { createCheckExists } from "./createCheckExists";
import { createCheckExistsMany } from "./createCheckExistsMany";
import { createFindOneOrThrowError } from "./createFindOneOrThrowError";
import { createUpdateOneOrThrowError } from "./createUpdateOneOrThrowError";
import { hashfy } from "./hashfy";

const ALREADY_EXISTS_ERROR =
  <T>(singular: string) =>
  (alreadyExistsItem: T) => {
    throw new Error(
      `${singular} (${hashfy(alreadyExistsItem)}) already exists.`
    );
  };

const ALREADY_EXISTS_MANY_ERROR =
  <T>(plural: string) =>
  (alreadyExistingItems: T[]) => {
    throw new Error(
      `${plural} [${alreadyExistingItems
        .map((item) => `(${hashfy(item)})`)
        .join(", ")}] already exists.`
    );
  };

const EXISTS_ERROR =
  <T>(singular: string) =>
  (missingItem: Partial<T>) => {
    throw new Error(`${singular} (${hashfy(missingItem)}) doesn't exists.`);
  };

const EXISTS_MANY_ERROR =
  <T>(plural: string) =>
  (missingItems: Partial<T>[]) => {
    throw new Error(
      `${plural} [${missingItems
        .map((item) => `(${hashfy(item)})`)
        .join(", ")}] doesn't exists.`
    );
  };

const FIND_ONE_ERROR =
  <T>(singular: string) =>
  (item: Partial<T>) => {
    throw new Error(
      `${singular} (${hashfy(item)}) doesn't exists, search fails.`
    );
  };

const UPDATE_ONE_ERROR =
  <T, TPrimary>(singular: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (item: TPrimary, values: Partial<T>) => {
    throw new Error(
      `${singular} (${hashfy(item)}) doesn't exists, update fails.`
    );
  };

export interface CreateExtensionOptions<T, TPrimary> {
  name: {
    singular: string;
    plural: string;
  };
  key: (item: Partial<T>) => string;
  errorHandlers: ErrorHandlers<T, TPrimary>;
}

export interface ErrorHandlers<T, TPrimary> {
  alreadyExistsError?: (alreadyExistingItem: T) => never;
  alreadyExistsManyError?: (alreadyExistingItems: T[]) => never;
  existsError?: (missingItem: Partial<T>) => never;
  existsManyError?: (missingItems: Partial<T>[]) => never;
  findOneError?: (item: Partial<T>) => never;
  updateOneError?: (item: TPrimary, values: Partial<T>) => never;
}

export const createExtension = <T, TPrimary>(
  Model: ModelProps<T, TPrimary>,
  {
    name: { singular, plural },
    key,
    errorHandlers: {
      alreadyExistsError,
      alreadyExistsManyError,
      existsError,
      existsManyError,
      findOneError,
      updateOneError,
    },
  }: CreateExtensionOptions<T, TPrimary>
) => {
  const checkAlreadyExists = createCheckAlreadyExists(
    Model,
    alreadyExistsError || ALREADY_EXISTS_ERROR<T>(singular)
  );

  const checkAlreadyExistsMany = createCheckAlreadyExistsMany(
    Model,
    alreadyExistsManyError || ALREADY_EXISTS_MANY_ERROR<T>(plural)
  );

  const checkExists = createCheckExists(
    Model,
    existsError || EXISTS_ERROR<T>(singular)
  );

  const checkExistsMany = createCheckExistsMany(
    Model,
    existsManyError || EXISTS_MANY_ERROR<T>(plural),
    key
  );

  const findOneOrThrowError = createFindOneOrThrowError(
    Model,
    findOneError || FIND_ONE_ERROR<T>(singular)
  );

  const updateOneOrThrowError = createUpdateOneOrThrowError(
    Model,
    updateOneError || UPDATE_ONE_ERROR<T, TPrimary>(singular)
  );

  return {
    checkAlreadyExists,
    checkAlreadyExistsMany,
    checkExists,
    checkExistsMany,
    findOneOrThrowError,
    updateOneOrThrowError,
  };
};

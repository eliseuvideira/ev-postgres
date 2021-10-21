import { createModel } from "..";

export const withExtensionsCreateModel =
  <Extensions>(extensions: Extensions) =>
  <T, Primary extends Partial<T>>(
    table: string,
    primary: (item: Primary) => Primary
  ) => {
    const Model = createModel<T, Primary>(table, primary);

    return { ...extensions, ...Model };
  };

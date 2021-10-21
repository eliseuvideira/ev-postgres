import { createModel } from "..";
import { ModelProps } from "./createModel";

export const withExtensionsCreateModel =
  <Extensions>(extensions: Extensions) =>
  <T, Primary extends Partial<T>>(
    table: string,
    primary: (item: Primary) => Primary
  ): Extensions & ModelProps<T, Primary> => {
    const Model = createModel<T, Primary>(table, primary);

    return { ...extensions, ...Model };
  };

import { Knex } from "knex";
import { Modify } from "./Modify";

export interface UpdateOneProps<Props, Primary> {
  database: Knex;
  id: Primary;
  values: Partial<Props>;
  modify?: Modify;
}

export type UpdateOne<Props, Primary> = ({
  database,
  id,
  values,
  modify,
}: UpdateOneProps<Props, Primary>) => Promise<Props | null>;

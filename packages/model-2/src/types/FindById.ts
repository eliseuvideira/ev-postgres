import { Knex } from "knex";
import { Modify } from "./Modify";

export interface FindByIdProps<Primary> {
  database: Knex;
  primary: Primary;
  modify?: Modify;
}

export type FindById<Props, Primary> = ({
  database,
  primary,
  modify,
}: FindByIdProps<Primary>) => Promise<Props | null>;

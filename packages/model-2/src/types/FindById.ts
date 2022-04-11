import { Knex } from "knex";
import { Modify } from "./Modify";

export interface FindByIdProps<Primary> {
  database: Knex;
  id: Primary;
  modify?: Modify;
}

export type FindById<Props, Primary> = ({
  database,
  id,
  modify,
}: FindByIdProps<Primary>) => Promise<Props | null>;

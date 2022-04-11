import { Knex } from "knex";
import { Modify } from "./Modify";

export interface DeleteOneProps<Primary> {
  database: Knex;
  primary: Primary;
  modify?: Modify;
}

export type DeleteOne<Primary> = ({
  database,
  primary,
  modify,
}: DeleteOneProps<Primary>) => Promise<void>;

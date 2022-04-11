import { Knex } from "knex";
import { Modify } from "./Modify";

export interface DeleteOneProps<Primary> {
  database: Knex;
  id: Primary;
  modify?: Modify;
}

export type DeleteOne<Primary> = ({
  database,
  id,
  modify,
}: DeleteOneProps<Primary>) => Promise<void>;

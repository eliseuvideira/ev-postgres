import { Knex } from "knex";
import { Modify } from "./Modify";

export interface InsertProps<Props> {
  database: Knex;
  items: Props[];
  modify?: Modify;
}

export type Insert<Props> = ({
  database,
  items,
  modify,
}: InsertProps<Props>) => Promise<Props[]>;

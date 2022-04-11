import { Knex } from "knex";
import { Modify } from "./Modify";

export interface InsertOneProps<Props> {
  database: Knex;
  item: Props;
  modify?: Modify;
}

export type InsertOne<Props> = ({
  database,
  item,
  modify,
}: InsertOneProps<Props>) => Promise<Props>;

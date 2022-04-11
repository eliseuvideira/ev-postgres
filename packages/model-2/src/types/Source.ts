import { Knex } from "knex";

export type Source = (database: Knex) => Knex.QueryBuilder;

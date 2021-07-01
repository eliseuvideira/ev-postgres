import knex from "knex";

const MIN_POOL = 2;
const MAX_POOL = 20;

export const database = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  pool: {
    min: MIN_POOL,
    max: MAX_POOL,
  },
});

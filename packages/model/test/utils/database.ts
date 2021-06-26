import knex from "knex";

const CONFIG = {
  HOST: process.env.POSTGRES_HOST,
  PORT: Number(process.env.POSTGRES_PORT),
  USERNAME: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DB,
  MIN_POOL: 2,
  MAX_POOL: 20,
};

export const database = knex({
  client: "pg",
  connection: {
    host: CONFIG.HOST,
    port: CONFIG.PORT,
    user: CONFIG.USERNAME,
    password: CONFIG.PASSWORD,
    database: CONFIG.DATABASE,
  },
  pool: {
    min: CONFIG.MIN_POOL,
    max: CONFIG.MAX_POOL,
  },
});

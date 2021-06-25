import { createModel } from "../src/index";
import knex from "knex";

const DB_CONFIG = {
  HOST: "localhost",
  PORT: 8888,
  USERNAME: "postgres_user",
  PASSWORD: "postgres_password",
  DATABASE: "postgres_db",
  MIN_POOL: 2,
  MAX_POOL: 2,
};

const DATABASE = knex({
  client: "pg",
  connection: {
    host: DB_CONFIG.HOST,
    port: DB_CONFIG.PORT,
    user: DB_CONFIG.USERNAME,
    password: DB_CONFIG.PASSWORD,
    database: DB_CONFIG.DATABASE,
  },
  pool: {
    min: DB_CONFIG.MIN_POOL,
    max: DB_CONFIG.MAX_POOL,
  },
});

const packages = [
  {
    name: "lodash",
    version: "4.17.21",
    downloads: 40_405_306,
  },
  {
    name: "chalk",
    version: "4.1.1",
    downloads: 95_588_662,
  },
  {
    name: "react",
    version: "17.0.2",
    downloads: 10_735_055,
  },
  {
    name: "express",
    version: "4.17.1",
    downloads: 16_908_105,
  },
  {
    name: "vue",
    version: "2.6.14",
    downloads: 2_532_689,
  },
  {
    name: "webpack",
    version: "5.40.0",
    downloads: 16_175_795,
  },
];

interface PackageProps {
  packageId: number;
  name: string;
  version: string;
  downloads: number;
}

beforeAll(async () => {
  await DATABASE.raw(`select 1 as db_status`);

  await DATABASE.raw("drop table if exists packages;");

  await DATABASE.schema.createTable("packages", (table) => {
    table.increments("package_id").primary();
    table.text("name").notNullable();
    table.text("version").notNullable();
    table.integer("downloads").notNullable();
  });

  await DATABASE.from("packages").insert(packages);
});

afterAll(async () => {
  await DATABASE.from("packages").delete();

  await DATABASE.raw("drop table if exists packages;");

  await DATABASE.destroy();
});

describe("createModel", () => {
  const PACKAGE_TABLE = "packages";
  const PACKAGE_FIELDS = [
    "packageId",
    "name",
    "version",
  ] as (keyof PackageProps)[];
  const PACKAGE_GET_PRIMARY_KEY = ({ packageId }: PackageProps) => ({
    packageId,
  });

  it("has the table name", () => {
    expect.assertions(1);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    expect(model.table).toBe(PACKAGE_TABLE);
  });

  it("has the table fields", () => {
    expect.assertions(1);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    expect(model.fields).toEqual(PACKAGE_FIELDS);
  });

  it("finds all rows", async () => {
    expect.assertions(3);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const rows = await model.find({ database: DATABASE });

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBe(packages.length);

    const sort = (a: any, b: any) => (a.name > b.name ? 1 : -1);

    const parsedRows = rows.map(({ name, version, downloads }) => ({
      name,
      version,
      downloads,
    }));

    expect(parsedRows.sort(sort)).toEqual(packages.sort(sort));
  });
});

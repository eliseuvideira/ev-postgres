import { dotenv } from "@ev-fns/dotenv";

dotenv();

import { createModel } from "../src/index";
import knex from "knex";

const CONFIG = {
  HOST: process.env.POSTGRES_HOST,
  PORT: +(process.env.POSTGRES_PORT || 5432),
  USERNAME: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DB,
  MIN_POOL: 2,
  MAX_POOL: 20,
};

const DATABASE = knex({
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

const packages = [
  {
    name: "lodash",
    version: "4.17.21",
    downloads: 40_405_306,
    last_published: "4 months ago",
  },
  {
    name: "chalk",
    version: "4.1.1",
    downloads: 95_588_662,
    last_published: "2 months ago",
  },
  {
    name: "react",
    version: "17.0.2",
    downloads: 10_735_055,
    last_published: "3 months ago",
  },
  {
    name: "express",
    version: "4.17.1",
    downloads: 16_908_105,
    last_published: "2 years ago",
  },
  {
    name: "vue",
    version: "2.6.14",
    downloads: 2_532_689,
    last_published: "18 days ago",
  },
  {
    name: "webpack",
    version: "5.40.0",
    downloads: 16_175_795,
    last_published: "4 days ago",
  },
];

interface PackageProps {
  package_id?: number;
  name: string;
  version: string;
  downloads: number;
  last_published: string;
}

beforeAll(async () => {
  await DATABASE.raw(`select 1 as db_status`);

  await DATABASE.raw("drop table if exists packages;");

  await DATABASE.schema.createTable("packages", (table) => {
    table.increments("package_id").primary();
    table.text("name").notNullable();
    table.text("version").notNullable();
    table.integer("downloads").notNullable();
    table.string("last_published").notNullable();
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
    "downloads",
    "lastPublished",
  ] as (keyof PackageProps)[];
  const PACKAGE_GET_PRIMARY_KEY = ({ package_id }: PackageProps) => ({
    package_id,
  });
  const parseRow = ({
    name,
    version,
    downloads,
    last_published,
  }: PackageProps) => ({
    name,
    version,
    downloads,
    last_published,
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

    const sort = (a: PackageProps, b: PackageProps) =>
      a.name > b.name ? 1 : -1;

    const parsedRows = rows.map(parseRow);

    expect(parsedRows.sort(sort)).toEqual(packages.sort(sort));
  });

  it("finds rows with a filter $eq", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const rows = await model.find({
      database: DATABASE,
      filter: { $eq: { name: "lodash" } },
    });

    expect(rows.length).toBe(1);
    expect(rows.map(parseRow)).toEqual(
      packages.filter((pkg) => pkg.name === "lodash")
    );
  });

  it("finds rows with a filter $sort", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const rows = await model.find({
      database: DATABASE,
      filter: { $sort: [{ column: "name", order: "desc" }] },
    });

    expect(rows.length).toBe(packages.length);
    expect(rows.map(parseRow)).toEqual(
      packages.sort((a, b) => (a.name > b.name ? -1 : +1))
    );
  });

  it("finds rows with a filter $limit", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const rows = await model.find({
      database: DATABASE,
      filter: { $limit: 1 },
    });

    expect(rows.length).toBe(1);

    const name = rows[0].name;

    expect(rows.map(parseRow)).toEqual(
      packages.filter((pkg) => pkg.name === name)
    );
  });

  it("finds rows with a filter $offset", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const rows = await model.find({
      database: DATABASE,
      filter: {
        $limit: 1,
        $offset: 1,
        $sort: [{ column: "name", order: "asc" }],
      },
    });

    expect(rows.length).toBe(1);

    const pkgs = packages.sort((a, b) => (a.name > b.name ? +1 : -1));

    expect(rows.map(parseRow)).toEqual([pkgs[1]]);
  });

  it("finds one", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const pkg = await model.findOne({ database: DATABASE });

    expect(pkg).toBeDefined();

    const name = pkg.name;

    expect(parseRow(pkg)).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one with a filter $eq", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const name = "webpack";

    const pkg = await model.findOne({
      database: DATABASE,
      filter: { $eq: { name } },
    });

    expect(pkg).toBeDefined();
    expect(parseRow(pkg)).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one if none found returns null", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const name = "invalid";

    const pkg = await model.findOne({
      database: DATABASE,
      filter: { $eq: { name } },
    });

    expect(pkg).not.toBeTruthy();
    expect(pkg).toBe(null);
  });

  it("counts the numbers of rows", async () => {
    expect.assertions(1);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const totalCount = await model.count({ database: DATABASE });

    expect(totalCount).toBe(packages.length);
  });

  it("counts the numbers of rows with a filter", async () => {
    expect.assertions(2);

    const model = createModel<PackageProps>({
      table: PACKAGE_TABLE,
      fields: PACKAGE_FIELDS,
      getPrimaryKey: PACKAGE_GET_PRIMARY_KEY,
    });

    const totalCount1 = await model.count({
      database: DATABASE,
      filter: { $eq: { name: "webpack" } },
    });

    expect(totalCount1).toBe(1);

    const totalCount2 = await model.count({
      database: DATABASE,
      filter: { $eq: { name: "invalid" } },
    });

    expect(totalCount2).toBe(0);
  });
});

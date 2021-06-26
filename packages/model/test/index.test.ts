import { dotenv } from "@ev-fns/dotenv";

dotenv();

import { createModel } from "../src/index";
import { database } from "./utils/database";
import { table } from "./utils/table";
import { packages } from "./utils/packages";
import { PackageProps } from "./utils/PackageProps";
import { fields } from "./utils/fields";
import { sample } from "./utils/sample";

beforeAll(async () => {
  await database.raw(`select 1 as db_status`);

  await database.raw(`drop table if exists ${table};`);

  await database.schema.createTable(table, (table) => {
    table.text("name").notNullable().primary();
    table.text("version").notNullable();
    table.text("license").notNullable();
    table.text("description").notNullable();
    table.text("created_at").notNullable();
    table.text("updated_at").notNullable();
    table.text("homepage").notNullable();
    table.text("repository").notNullable();
    table.integer("downloads").notNullable();
  });

  await database.from(table).insert(packages);
});

afterAll(async () => {
  await database.from(table).delete();

  await database.raw(`drop table if exists ${table};`);

  await database.destroy();
});

describe("createModel", () => {
  const getPrimaryKey = ({ package_id }: PackageProps) => ({
    package_id,
  });

  const __model = () =>
    createModel<PackageProps>({
      table,
      fields,
      getPrimaryKey,
    });

  const descending = (a: PackageProps, b: PackageProps) =>
    a.name > b.name ? -1 : +1;

  const ascending = (a: PackageProps, b: PackageProps) =>
    a.name > b.name ? +1 : -1;

  it("has the table name", () => {
    expect.assertions(1);

    const model = __model();

    expect(model.table).toBe(table);
  });

  it("has the table fields", () => {
    expect.assertions(1);

    const model = __model();

    expect(model.fields).toEqual(fields);
  });

  it("finds all rows", async () => {
    expect.assertions(3);

    const model = __model();

    const rows = await model.find({ database: database });

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBe(packages.length);
    expect(rows.sort(ascending)).toEqual(packages.sort(ascending));
  });

  it("finds rows with a filter $eq", async () => {
    expect.assertions(2);

    const model = __model();

    const item = sample();

    const rows = await model.find({
      database: database,
      filter: { $eq: { name: item.name } },
    });

    expect(rows.length).toBe(1);
    expect(rows).toEqual(packages.filter((pkg) => pkg.name === item.name));
  });

  it("finds rows with a filter $sort", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find({
      database: database,
      filter: { $sort: [{ column: "name", order: "desc" }] },
    });

    expect(rows.length).toBe(packages.length);
    expect(rows).toEqual(packages.sort(descending));
  });

  it("finds rows with a filter $limit", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find({
      database: database,
      filter: { $limit: 1 },
    });

    expect(rows.length).toBe(1);

    const name = rows[0].name;

    expect(rows).toEqual(packages.filter((pkg) => pkg.name === name));
  });

  it("finds rows with a filter $offset", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find({
      database: database,
      filter: {
        $limit: 1,
        $offset: 1,
        $sort: [{ column: "name", order: "asc" }],
      },
    });

    expect(rows.length).toBe(1);
    expect(rows).toEqual(packages.sort(ascending).slice(1, 2));
  });

  it("finds one", async () => {
    expect.assertions(2);

    const model = __model();

    const pkg = await model.findOne({ database: database });

    expect(pkg).toBeDefined();

    const name = pkg.name;

    expect(pkg).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one with a filter $eq", async () => {
    expect.assertions(2);

    const model = __model();

    const name = sample().name;

    const pkg = await model.findOne({
      database: database,
      filter: { $eq: { name } },
    });

    expect(pkg).toBeDefined();
    expect(pkg).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one if none found returns null", async () => {
    expect.assertions(2);

    const model = __model();

    const name = "invalid";

    const pkg = await model.findOne({
      database: database,
      filter: { $eq: { name } },
    });

    expect(pkg).not.toBeTruthy();
    expect(pkg).toBe(null);
  });

  it("counts the numbers of rows", async () => {
    expect.assertions(1);

    const model = __model();

    const totalCount = await model.count({ database: database });

    expect(totalCount).toBe(packages.length);
  });

  it("counts the numbers of rows with a filter", async () => {
    expect.assertions(2);

    const model = __model();

    const item = sample();

    const totalCount1 = await model.count({
      database: database,
      filter: { $eq: { name: item.name } },
    });

    expect(totalCount1).toBe(1);

    const totalCount2 = await model.count({
      database: database,
      filter: { $eq: { name: "invalid" } },
    });

    expect(totalCount2).toBe(0);
  });

  it("checks if exists rows on true", async () => {
    expect.assertions(2);

    const model = __model();

    const exists1 = await model.exists({ database: database });

    expect(exists1).toBe(true);

    const item = sample();

    const exists2 = await model.exists({
      database: database,
      filter: { $eq: { name: item.name } },
    });

    expect(exists2).toBe(true);
  });

  it("check if exists rows on false", async () => {
    expect.assertions(1);

    const model = __model();

    const exists = await model.exists({
      database: database,
      filter: { $eq: { downloads: -1 } },
    });

    expect(exists).toBe(false);
  });

  it("inserts a row", async () => {
    expect.assertions(2);

    const model = __model();

    const pkgs: PackageProps[] = [
      {
        name: "yarn",
        version: "1.22.10",
        license: "BSD-2-Clause",
        description: "📦🐈 Fast, reliable, and secure dependency management.",
        created_at: "2012-03-21T17:54:19.255Z",
        updated_at: "2021-04-24T14:45:06.588Z",
        homepage: "https://github.com/yarnpkg/yarn#readme",
        repository: "git+https://github.com/yarnpkg/yarn.git",
        downloads: 2141439,
      },
      {
        name: "lerna",
        version: "4.0.0",
        license: "MIT",
        description:
          "A tool for managing JavaScript projects with multiple packages.",
        created_at: "2015-12-04T12:25:28.376Z",
        updated_at: "2021-06-23T12:18:57.300Z",
        homepage: "https://github.com/lerna/lerna#readme",
        repository: "git+https://github.com/lerna/lerna.git",
        downloads: 1196004,
      },
    ];

    const rows = await model.insert({ database: database }, pkgs);

    expect(rows.length).toBe(pkgs.length);
    expect(rows).toEqual(pkgs);
  });
});

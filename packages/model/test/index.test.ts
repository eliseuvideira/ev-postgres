import { dotenv } from "@ev-fns/dotenv";

dotenv();

import { createModel } from "../src/index";
import { database } from "./utils/database";
import { table } from "./utils/table";
import { packages } from "./utils/packages";
import { PackageProps } from "./utils/PackageProps";
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
    table.text("homepage");
    table.text("repository").notNullable();
    table.integer("downloads").notNullable();
  });
});

afterAll(async () => {
  await database.raw(`drop table if exists ${table};`);

  await database.destroy();
});

beforeEach(async () => {
  await database.from(table).insert(packages);
});

afterEach(async () => {
  await database.from(table).delete();
});

describe("createModel", () => {
  const __model = () =>
    createModel<PackageProps>(table, ({ name }) => ({ name }));

  const descending = (a: PackageProps, b: PackageProps) =>
    a.name > b.name ? -1 : +1;

  const ascending = (a: PackageProps, b: PackageProps) =>
    a.name > b.name ? +1 : -1;

  const extraPackages: PackageProps[] = [
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

  it("has the table name", () => {
    expect.assertions(1);

    const model = __model();

    expect(model.table).toBe(table);
  });

  it("finds all rows", async () => {
    expect.assertions(3);

    const model = __model();

    const rows = await model.find(database);

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBe(packages.length);
    expect(rows.sort(ascending)).toEqual(packages.sort(ascending));
  });

  it("finds rows with a filter $eq", async () => {
    expect.assertions(2);

    const model = __model();

    const item = sample();

    const rows = await model.find(database, { $eq: { name: item.name } });

    expect(rows.length).toBe(1);
    expect(rows).toEqual(packages.filter((pkg) => pkg.name === item.name));
  });

  it("finds rows with a filter $sort", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find(database, {
      $sort: [{ column: "name", order: "desc" }],
    });

    expect(rows.length).toBe(packages.length);
    expect(rows).toEqual(packages.sort(descending));
  });

  it("finds rows with a filter $limit", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find(database, { $limit: 1 });

    expect(rows.length).toBe(1);

    const name = rows[0].name;

    expect(rows).toEqual(packages.filter((pkg) => pkg.name === name));
  });

  it("finds rows with a filter $offset", async () => {
    expect.assertions(2);

    const model = __model();

    const rows = await model.find(database, {
      $limit: 1,
      $offset: 1,
      $sort: [{ column: "name", order: "asc" }],
    });

    expect(rows.length).toBe(1);
    expect(rows).toEqual(packages.sort(ascending).slice(1, 2));
  });

  it("finds one", async () => {
    expect.assertions(2);

    const model = __model();

    const pkg = await model.findOne(database);

    if (!pkg) {
      fail();
    }

    expect(pkg).toBeDefined();

    const name = pkg.name;

    expect(pkg).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one with a filter $eq", async () => {
    expect.assertions(2);

    const model = __model();

    const name = sample().name;

    const pkg = await model.findOne(database, { $eq: { name } });

    expect(pkg).toBeDefined();
    expect(pkg).toEqual(packages.find((pkg) => pkg.name === name));
  });

  it("finds one if none found returns null", async () => {
    expect.assertions(2);

    const model = __model();

    const name = "invalid";

    const pkg = await model.findOne(database, { $eq: { name } });

    expect(pkg).not.toBeTruthy();
    expect(pkg).toBe(null);
  });

  it("counts the numbers of rows", async () => {
    expect.assertions(1);

    const model = __model();

    const totalCount = await model.count(database);

    expect(totalCount).toBe(packages.length);
  });

  it("counts the numbers of rows with a filter", async () => {
    expect.assertions(2);

    const model = __model();

    const item = sample();

    const totalCount1 = await model.count(database, {
      $eq: { name: item.name },
    });

    expect(totalCount1).toBe(1);

    const totalCount2 = await model.count(database, {
      $eq: { name: "invalid" },
    });

    expect(totalCount2).toBe(0);
  });

  it("checks if exists rows on true", async () => {
    expect.assertions(2);

    const model = __model();

    const exists1 = await model.exists(database);

    expect(exists1).toBe(true);

    const item = sample();

    const exists2 = await model.exists(database, { $eq: { name: item.name } });

    expect(exists2).toBe(true);
  });

  it("check if exists rows on false", async () => {
    expect.assertions(1);

    const model = __model();

    const exists = await model.exists(database, { $eq: { downloads: -1 } });

    expect(exists).toBe(false);
  });

  it("inserts empty array by doing nothing and returning empty array", async () => {
    expect.assertions(4);

    const model = __model();

    const pkgs: any[] = [];

    const rows = await model.insert(database, pkgs);

    expect(rows).not.toBe(pkgs);
    expect(rows).toEqual([]);
    expect(rows.length).toBe(0);
    expect(rows).toEqual(pkgs);
  });

  it("inserts rows", async () => {
    expect.assertions(2);

    const model = __model();

    const pkgs = extraPackages;

    const rows = await model.insert(database, pkgs);

    expect(rows.length).toBe(pkgs.length);
    expect(rows).toEqual(pkgs);

    packages.push(...rows);
  });

  it("inserts one row", async () => {
    expect.assertions(1);

    const model = __model();

    const item = extraPackages[Math.floor(Math.random() * 2)];

    item.name += Math.random();

    const inserted = await model.insertOne(database, item);

    expect(inserted).toEqual(item);

    packages.push(item);
  });

  it("updates rows", async () => {
    expect.assertions(2);

    const model = __model();

    packages.forEach((item) => {
      item.repository = "npm package";
    });

    const values = await model.update(
      database,
      {},
      { repository: "npm package" }
    );

    expect(values.length).toBe(packages.length);
    expect(values.sort(ascending)).toEqual(packages.sort(ascending));
  });

  it("updates rows with a filter", async () => {
    expect.assertions(2);

    const model = __model();

    const items = packages.filter((item) => item.license === "MIT");

    items.forEach((item) => {
      item.version = "0.0.0";
    });

    const values = await model.update(
      database,
      { $eq: { license: "MIT" } },
      { version: "0.0.0" }
    );

    expect(values.length).toBe(items.length);
    expect(values.sort(ascending)).toEqual(items.sort(ascending));
  });

  it("updates a single row", async () => {
    expect.assertions(1);

    const model = __model();

    const item = sample();

    item.downloads = 0;

    const value = await model.updateOne(database, item, { downloads: 0 });

    expect(value).toEqual(item);
  });

  it("updates a single row, if none found returns null", async () => {
    expect.assertions(1);

    const model = __model();

    const value = await model.updateOne(
      database,
      { name: "any" },
      { downloads: 1 }
    );

    expect(value).toEqual(null);
  });

  it("deletes rows", async () => {
    expect.assertions(4);

    const model = __model();

    await model.delete(database);

    const items = await model.find(database);

    expect(items.length).toBe(0);
    expect(items).toEqual([]);

    await model.insert(database, packages);

    const newItems = await model.find(database);

    expect(newItems.length).toBe(packages.length);
    expect(newItems.sort(ascending)).toEqual(packages.sort(ascending));
  });

  it("deletes rows with a filter", async () => {
    expect.assertions(4);

    const model = __model();

    const license = "MIT";

    await model.delete(database, { $eq: { license } });

    const items = await model.find(database);

    expect(items.length).toBeGreaterThan(0);
    expect(items.sort(ascending)).toEqual(
      packages.filter((x) => x.license !== license).sort(ascending)
    );

    await model.insert(
      database,
      packages.filter((x) => x.license === license)
    );

    const newItems = await model.find(database);

    expect(newItems.length).toBe(packages.length);
    expect(newItems.sort(ascending)).toEqual(packages.sort(ascending));
  });

  it("delete one row", async () => {
    expect.assertions(2);

    const model = __model();

    const item = sample();

    await model.deleteOne(database, item);

    const items = await model.find(database);

    expect(items.length).toBe(packages.length - 1);
    expect(items.sort(ascending)).toEqual(
      packages.filter((x) => x !== item).sort(ascending)
    );

    await model.insertOne(database, item);
  });

  it("finds using filter $in", async () => {
    expect.assertions(3);

    const model = __model();

    const names = ["webpack", "typescript"];

    const items = packages.filter((pkg) => names.includes(pkg.name));

    const values = await model.find(database, { $in: { name: names } });

    expect(values.length).toBe(items.length);
    expect(values.sort(ascending)).toEqual(items.sort(ascending));
    expect(values.map((x) => x.name).sort()).toEqual(names.sort());
  });

  it("finds using filter $regex", async () => {
    expect.assertions(4);

    const model = __model();

    const regex1 = /Apache/;
    const items1 = await model.find(database, { $regex: { license: regex1 } });

    expect(items1.length).toBeGreaterThan(0);
    expect(items1.sort(ascending)).toEqual(
      packages.filter((pkg) => regex1.test(pkg.license)).sort(ascending)
    );

    const regex2 = /mit/i;
    const items2 = await model.find(database, { $regex: { license: regex2 } });

    expect(items2.length).toBeGreaterThan(0);
    expect(items2.sort(ascending)).toEqual(
      packages.filter((pkg) => regex2.test(pkg.license)).sort(ascending)
    );
  });

  it("finds using filter $null", async () => {
    expect.assertions(2);

    const model = __model();

    const items = await model.find({
      database,
      filter: { $null: ["homepage"] },
    });

    expect(items.length).toBeGreaterThan(0);
    expect(items.sort(ascending)).toEqual(
      packages.filter((pkg) => pkg.homepage == null).sort(ascending)
    );
  });

  it("finds using filter $notnull", async () => {
    expect.assertions(2);

    const model = __model();

    const items = await model.find({
      database,
      filter: { $notnull: ["homepage"] },
    });

    expect(items.length).toBeGreaterThan(0);
    expect(items.sort(ascending)).toEqual(
      packages.filter((pkg) => pkg.homepage != null).sort(ascending)
    );
  });

  it("finds using filter $like", async () => {
    expect.assertions(3);

    const model = __model();

    const items = packages.filter((x) => /framework/.test(x.description));

    const values = await model.find(database, {
      $like: { description: "framework" },
    });

    expect(values.length).toBeGreaterThan(0);
    expect(values.length).toEqual(items.length);
    expect(values.sort(ascending)).toEqual(items.sort(ascending));
  });
});

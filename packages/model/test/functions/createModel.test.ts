const count = jest.fn();
const createCount = jest.fn(() => count);
jest.mock("../../src/functions/createCount", () => ({ createCount }));

const exists = jest.fn();
const createExists = jest.fn(() => exists);
jest.mock("../../src/functions/createExists", () => ({
  createExists,
}));

const find = jest.fn();
const createFind = jest.fn(() => find);
jest.mock("../../src/functions/createFind", () => ({ createFind }));

const findOne = jest.fn();
const createFindOne = jest.fn(() => findOne);
jest.mock("../../src/functions/createFindOne", () => ({ createFindOne }));

const insert = jest.fn();
const createInsert = jest.fn(() => insert);
jest.mock("../../src/functions/createInsert", () => ({ createInsert }));

const insertOne = jest.fn();
const createInsertOne = jest.fn(() => insertOne);
jest.mock("../../src/functions/createInsertOne", () => ({ createInsertOne }));

const update = jest.fn();
const createUpdate = jest.fn(() => update);
jest.mock("../../src/functions/createUpdate", () => ({ createUpdate }));

const updateOne = jest.fn();
const createUpdateOne = jest.fn(() => updateOne);
jest.mock("../../src/functions/createUpdateOne", () => ({ createUpdateOne }));

const _delete = jest.fn();
const createDelete = jest.fn(() => _delete);
jest.mock("../../src/functions/createDelete", () => ({ createDelete }));

import { createModel } from "../../src/functions/createModel";
import { PackageProps } from "../utils/PackageProps";
import { table } from "../utils/table";

describe("createModel", () => {
  it("creates a model", async () => {
    expect.assertions(39);

    const fields = [
      "name",
      "version",
      "license",
      "homepage",
      "description",
      "downloads",
      "created_at",
      "updated_at",
      "repository",
    ] as (keyof PackageProps)[];

    const getPrimaryKey = ({ name }: Partial<PackageProps>) => ({ name });

    const model = createModel<PackageProps>({
      table,
      fields,
      getPrimaryKey,
    });

    expect(model.table).toBe(table);
    expect(model.fields).toBe(fields);
    expect(model.find).toBeDefined();
    expect(model.find).toEqual(find);
    expect(model.findOne).toBeDefined();
    expect(model.findOne).toEqual(findOne);
    expect(model.count).toBeDefined();
    expect(model.count).toEqual(count);
    expect(model.exists).toBeDefined();
    expect(model.exists).toEqual(exists);
    expect(model.insert).toBeDefined();
    expect(model.insert).toEqual(insert);
    expect(createCount).toHaveBeenCalledTimes(1);
    expect(createCount).toHaveBeenCalledWith({ table });
    expect(createExists).toHaveBeenCalledTimes(1);
    expect(createExists).toHaveBeenCalledWith(count);
    expect(createFind).toHaveBeenCalledTimes(1);
    expect(createFind).toHaveBeenCalledWith({ table });
    expect(createFindOne).toHaveBeenCalledTimes(1);
    expect(createFindOne).toHaveBeenCalledWith({ table });
    expect(createInsert).toHaveBeenCalledTimes(1);
    expect(createInsert).toHaveBeenCalledWith({ table });
    expect(createInsertOne).toHaveBeenCalledTimes(1);
    expect(createInsertOne).toHaveBeenCalledWith({ table });
    expect(createUpdate).toHaveBeenCalledTimes(1);
    expect(createUpdate).toHaveBeenCalledWith({ table });
    expect(createUpdateOne).toHaveBeenCalledTimes(1);
    expect(createUpdateOne).toHaveBeenCalledWith({ table, getPrimaryKey });
    expect(createDelete).toHaveBeenCalledTimes(1);
    expect(createDelete).toHaveBeenCalledWith({ table });
    expect(count).not.toHaveBeenCalled();
    expect(exists).not.toHaveBeenCalled();
    expect(find).not.toHaveBeenCalled();
    expect(findOne).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
    expect(insertOne).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
    expect(updateOne).not.toHaveBeenCalled();
    expect(_delete).not.toHaveBeenCalled();
  });
});

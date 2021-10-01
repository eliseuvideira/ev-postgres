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

const findById = jest.fn();
const createFindById = jest.fn(() => findById);
jest.mock("../../src/functions/createFindById", () => ({ createFindById }));

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

const deleteOne = jest.fn();
const createDeleteOne = jest.fn(() => deleteOne);
jest.mock("../../src/functions/createDeleteOne", () => ({ createDeleteOne }));

import { createModel } from "../../src/functions/createModel";
import { PackageProps } from "../utils/PackageProps";
import { PackagePropsPrimary } from "../utils/PackagePropsPrimary";
import { table } from "../utils/table";

describe("createModel", () => {
  it("creates a model", async () => {
    expect.assertions(43);

    const primary = ({ name }: PackagePropsPrimary): PackagePropsPrimary => ({
      name,
    });

    const model = createModel<PackageProps, PackagePropsPrimary>(
      table,
      primary
    );

    expect(model.table).toBe(table);
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
    expect(createCount).toHaveBeenCalledWith(table);
    expect(createExists).toHaveBeenCalledTimes(1);
    expect(createExists).toHaveBeenCalledWith(count);
    expect(createFind).toHaveBeenCalledTimes(1);
    expect(createFind).toHaveBeenCalledWith(table);
    expect(createFindById).toHaveBeenCalledTimes(1);
    expect(createFindById).toHaveBeenCalledWith(table, primary);
    expect(createFindOne).toHaveBeenCalledTimes(1);
    expect(createFindOne).toHaveBeenCalledWith(table);
    expect(createInsert).toHaveBeenCalledTimes(1);
    expect(createInsert).toHaveBeenCalledWith(table);
    expect(createInsertOne).toHaveBeenCalledTimes(1);
    expect(createInsertOne).toHaveBeenCalledWith(table);
    expect(createUpdate).toHaveBeenCalledTimes(1);
    expect(createUpdate).toHaveBeenCalledWith(table);
    expect(createUpdateOne).toHaveBeenCalledTimes(1);
    expect(createUpdateOne).toHaveBeenCalledWith(table, primary);
    expect(createDelete).toHaveBeenCalledTimes(1);
    expect(createDelete).toHaveBeenCalledWith(table);
    expect(createDeleteOne).toHaveBeenCalledTimes(1);
    expect(createDeleteOne).toHaveBeenCalledWith(table, primary);
    expect(count).not.toHaveBeenCalled();
    expect(exists).not.toHaveBeenCalled();
    expect(find).not.toHaveBeenCalled();
    expect(findOne).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
    expect(insertOne).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
    expect(updateOne).not.toHaveBeenCalled();
    expect(_delete).not.toHaveBeenCalled();
    expect(deleteOne).not.toHaveBeenCalled();
  });
});

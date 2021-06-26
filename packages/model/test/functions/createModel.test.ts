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

import { createModel } from "../../src/functions/createModel";
import { PackageProps } from "../utils/PackageProps";
import { table } from "../utils/table";

describe("createModel", () => {
  it("creates a model", async () => {
    expect.assertions(27);

    const fields = ["name", "version"] as (keyof PackageProps)[];
    const getPrimaryKey = ({ name }: PackageProps) => ({ name });

    const model = createModel<PackageProps>({ table, fields, getPrimaryKey });

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
    expect(createCount).toHaveBeenLastCalledWith({ table });
    expect(createExists).toHaveBeenCalledTimes(1);
    expect(createExists).toHaveBeenLastCalledWith(count);
    expect(createFind).toHaveBeenCalledTimes(1);
    expect(createFind).toHaveBeenLastCalledWith({ table });
    expect(createFindOne).toHaveBeenCalledTimes(1);
    expect(createFindOne).toHaveBeenLastCalledWith({ table });
    expect(createInsert).toHaveBeenCalledTimes(1);
    expect(createInsert).toHaveBeenLastCalledWith({ table });
    expect(count).not.toHaveBeenCalled();
    expect(exists).not.toHaveBeenCalled();
    expect(find).not.toHaveBeenCalled();
    expect(findOne).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });
});

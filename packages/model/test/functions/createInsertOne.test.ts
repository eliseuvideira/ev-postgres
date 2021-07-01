import { createInsertOne } from "../../src/functions/createInsertOne";
import { table } from "../utils/table";
import { sample } from "../utils/sample";
import { PackageProps } from "../utils/PackageProps";

describe("createInsertOne", () => {
  it("creates an insert one method", async () => {
    expect.assertions(7);

    const insertOne = createInsertOne<PackageProps>(table);

    const item = sample();

    const returning = jest.fn(() => [item]);
    const insert = jest.fn(() => ({ returning }));
    const from = jest.fn(() => ({ insert }));
    const database = { from } as any;

    const insertedItem = await insertOne(database, item);

    expect(insertedItem).toEqual(item);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenLastCalledWith(table);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(item);
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});

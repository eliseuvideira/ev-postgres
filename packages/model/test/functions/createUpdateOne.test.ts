import { createUpdateOne } from "../../src/functions/createUpdateOne";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createUpdateOne", () => {
  it("creates an update one method", async () => {
    expect.assertions(9);

    const updateOne = createUpdateOne<PackageProps>({
      table,
      getPrimaryKey: ({ name }) => ({ name }),
    });

    const item = sample();
    const version = "0.0.0";

    const returning = jest.fn(() => [{ ...item, version }]);
    const update = jest.fn(() => ({ returning }));
    const where = jest.fn(() => ({ update }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const instance = { name: Math.random().toString() };

    const updated = await updateOne({ database, instance }, { version });

    expect(updated).toEqual({ ...item, version });
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith(instance);
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({ version });
    expect(returning).toHaveBeenCalledTimes(1);
    expect(returning).toHaveBeenCalledWith("*");
  });
});

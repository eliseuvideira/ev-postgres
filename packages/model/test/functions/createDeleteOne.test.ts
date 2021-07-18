import { createDeleteOne } from "../../src/functions/createDeleteOne";
import { PackageProps } from "../utils/PackageProps";
import { table } from "../utils/table";

describe("createDeleteOne", () => {
  it("creates an delete one method", async () => {
    expect.assertions(6);

    const deleteOne = createDeleteOne<PackageProps>(table, ({ name }) => ({
      name,
    }));

    const _delete = jest.fn();
    const where = jest.fn(() => ({ delete: _delete }));
    const from = jest.fn(() => ({ where }));
    const database = { from } as any;

    const item = { name: Math.random().toString() } as PackageProps;

    await deleteOne(database, item);

    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(where).toHaveBeenCalledTimes(1);
    expect(where).toHaveBeenCalledWith(item);
    expect(_delete).toHaveBeenCalledTimes(1);
    expect(_delete).toHaveBeenCalledWith();
  });
});

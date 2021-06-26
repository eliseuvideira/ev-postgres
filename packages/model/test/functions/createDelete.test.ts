import { createDelete } from "../../src/functions/createDelete";
import { PackageProps } from "../utils/PackageProps";
import { table } from "../utils/table";

describe("createDelete", () => {
  it("creates a delete method", async () => {
    expect.assertions(7);

    const _delete = createDelete<PackageProps>({ table });

    const license = "MIT";

    const deleteFn = jest.fn();
    const andWhere = jest.fn();
    const builder = { andWhere };
    const modify = jest.fn((modify) => {
      modify(builder);
      return { delete: deleteFn };
    });
    const from = jest.fn(() => ({ modify }));
    const database = { from } as any;

    await _delete({ database, filter: { $eq: { license } } });

    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("license", "=", license);
    expect(deleteFn).toHaveBeenCalledTimes(1);
    expect(deleteFn).toHaveBeenCalledWith();
  });
});

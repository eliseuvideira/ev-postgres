import { createFindOne } from "../../src/functions/createFindOne";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createFindOne", () => {
  it("creates a find one method", async () => {
    expect.assertions(7);

    const findOne = createFindOne<PackageProps>({ table });

    const item = sample();

    const first = jest.fn(() => item);
    const andWhere = jest.fn();
    const builder = { andWhere };
    const modify = jest.fn((modify) => {
      modify(builder);

      return { first };
    });
    const from = jest.fn(() => ({ modify }));
    const database = { from } as any;

    const pkg = sample();

    const value = await findOne({
      database,
      filter: { $eq: { name: pkg.name } },
    });

    expect(value).toEqual(item);
    expect(first).toHaveBeenCalledTimes(1);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("name", "=", pkg.name);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});

import { createFind } from "../../src/functions/createFind";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";
import { table } from "../utils/table";

describe("createFind", () => {
  it("creates a find method", async () => {
    expect.assertions(6);

    const find = createFind<PackageProps>(table);

    const item = sample();
    const items = [item, sample(), sample()];

    const andWhere = jest.fn();

    const builder = {
      andWhere,
    };

    const modify = jest.fn((modify) => {
      modify(builder);

      return items;
    });
    const from = jest.fn(() => ({ modify }));

    const database = { from } as any;
    const filter = { $eq: { name: item.name } } as any;

    const values = await find(database, filter);

    expect(values).toEqual(items);
    expect(modify).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledTimes(1);
    expect(andWhere).toHaveBeenCalledWith("name", "=", item.name);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(table);
  });
});

import { parseFilter } from "../../src/functions/parseFilter";

interface PackageProps {
  name: string;
  version: string;
}

describe("parseFilter", () => {
  it("sets the $eq filter", () => {
    expect.assertions(4);

    const name = "typescript";
    const version = "4.3.4";

    const modify = parseFilter<PackageProps>({
      $eq: { name, version },
    });

    const andWhere = jest.fn();

    const builder = {
      andWhere,
    };

    modify(builder as any);

    expect(andWhere).toHaveBeenCalled();
    expect(andWhere).toHaveBeenCalledTimes(2);
    expect(andWhere.mock.calls[0]).toEqual(["name", "=", name]);
    expect(andWhere.mock.calls[1]).toEqual(["version", "=", version]);
  });

  it("sets the $limit filter", () => {
    expect.assertions(3);

    const $limit = Math.floor(Math.random() * 100) + 1;

    const modify = parseFilter<PackageProps>({ $limit });
    const limit = jest.fn();

    const builder = {
      limit,
    };

    modify(builder as any);

    expect(limit).toHaveBeenCalled();
    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toHaveBeenCalledWith($limit);
  });

  it("sets the $offset filter", () => {
    expect.assertions(3);

    const $offset = Math.floor(Math.random() * 100) + 1;

    const mofidy = parseFilter<PackageProps>({ $offset });
    const offset = jest.fn();

    const builder = {
      offset,
    };

    mofidy(builder as any);

    expect(offset).toHaveBeenCalled();
    expect(offset).toHaveBeenCalledTimes(1);
    expect(offset).toHaveBeenCalledWith($offset);
  });

  it("sets the $sort filter", () => {
    expect.assertions(3);

    const $sort = [{ column: "name" as const, order: "asc" as const }];

    const modify = parseFilter<PackageProps>({
      $sort,
    });
    const orderBy = jest.fn();

    const builder = {
      orderBy,
    };

    modify(builder as any);

    expect(orderBy).toHaveBeenCalled();
    expect(orderBy).toHaveBeenCalledTimes(1);
    expect(orderBy.mock.calls[0][0]).toEqual($sort);
  });
});

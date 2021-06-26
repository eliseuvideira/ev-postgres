import { parseFilter } from "../../src/functions/parseFilter";
import { PackageProps } from "../utils/PackageProps";
import { sample } from "../utils/sample";

describe("parseFilter", () => {
  it("sets the $eq filter", () => {
    expect.assertions(4);

    const pkg = sample();

    const modify = parseFilter<PackageProps>({
      $eq: { name: pkg.name, version: pkg.version },
    });

    const andWhere = jest.fn();

    const builder = {
      andWhere,
    };

    modify(builder as any);

    expect(andWhere).toHaveBeenCalled();
    expect(andWhere).toHaveBeenCalledTimes(2);
    expect(andWhere.mock.calls[0]).toEqual(["name", "=", pkg.name]);
    expect(andWhere.mock.calls[1]).toEqual(["version", "=", pkg.version]);
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

  it("sets the $in filter", () => {
    expect.assertions(2);

    const $in = { name: ["webpack", "typescript"] };

    const modify = parseFilter<PackageProps>({ $in });

    const whereIn = jest.fn();

    const builder = { whereIn } as any;

    modify(builder);

    expect(whereIn).toHaveBeenCalledTimes(1);
    expect(whereIn).toHaveBeenLastCalledWith("name", $in.name);
  });

  it("sets the $like filter", () => {
    expect.assertions(4);

    const $like1 = { name: "pr" };

    const modify1 = parseFilter<PackageProps>({ $like: $like1 });

    const andWhereRaw1 = jest.fn();
    const builder1 = { andWhereRaw: andWhereRaw1 } as any;

    modify1(builder1);

    expect(andWhereRaw1).toHaveBeenCalledTimes(1);
    expect(andWhereRaw1).toHaveBeenCalledWith(
      "lower(unaccent(name)) like lower(unaccent(?))",
      ["%" + $like1.name + "%"]
    );

    const $like2 = { name: "%[_" };

    const modify2 = parseFilter<PackageProps>({ $like: $like2 });

    const andWhereRaw2 = jest.fn();
    const builder2 = { andWhereRaw: andWhereRaw2 } as any;

    modify2(builder2);

    expect(andWhereRaw2).toHaveBeenCalledTimes(1);
    expect(andWhereRaw2).toHaveBeenCalledWith(
      "lower(unaccent(name)) like lower(unaccent(?))",
      ["%" + "[%][[][_]" + "%"]
    );
  });

  it("sets the $regex filter", () => {
    expect.assertions(4);

    const $regex1 = { license: /mit/ };

    const modify1 = parseFilter<PackageProps>({ $regex: $regex1 });

    const andWhere1 = jest.fn();
    const builder1 = { andWhere: andWhere1 } as any;

    modify1(builder1);

    expect(andWhere1).toHaveBeenCalledTimes(1);
    expect(andWhere1).toHaveBeenCalledWith(
      "license",
      "~",
      $regex1.license.source
    );

    const $regex2 = { license: /mit/i };

    const modify2 = parseFilter<PackageProps>({ $regex: $regex2 });

    const andWhere2 = jest.fn();
    const builder2 = { andWhere: andWhere2 } as any;

    modify2(builder2);

    expect(andWhere2).toHaveBeenCalledTimes(1);
    expect(andWhere2).toHaveBeenLastCalledWith(
      "license",
      "~*",
      $regex2.license.source
    );
  });
});

describe("package", () => {
  it("prints to the console", async () => {
    expect.assertions(2);

    const log = jest.fn();
    const _ = console.log;
    console.log = log;
    try {
      require("../src/index");

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("Hello World 👋!");
    } finally {
      console.log = _;
    }
  });
});

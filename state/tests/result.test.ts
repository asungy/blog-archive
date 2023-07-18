import { Result } from "../src/result";

test("Result class constructor", () => {
  expect(() => {
    new Result(42, "error");
  }).toThrowError();

  expect(() => {
    new Result(null, null);
  }).toThrowError();
});

test("Result class `is_ok` method", () => {
  let result = new Result(42);
  expect(result.is_ok()).toBe(true);
});

test("Result class `is_err` method", () => {
  let result = new Result(null, "some error");
  expect(result.is_err()).toBe(true);
});

test("Result class `map` method", () => {
  // Test ok result.
  {
    let result = new Result(42);
    let f = (num: number | null) => {
      return num! * 2;
    };
    expect(result.map(f)).toBe(84);
  }

  // Test error result.
  {
    let result = new Result(null, "some error");
    let f = (num: number | null) => {
      return num! * 2;
    };
    expect(result.map(f)).toBeUndefined();
  }
});

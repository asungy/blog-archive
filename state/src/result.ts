import { strict as assert } from "node:assert";

export class Void {
  constructor() {}
}

export class Result<T, U> {
  private ok: T | null;
  private error: U | null;

  constructor(ok: T | null, error: U | null = null) {
    assert(( ok !== null && error === null ) || ( ok === null && error !== null ));

    this.ok = ok;
    this.error = error;
  }

  is_ok(): boolean {
    return this.ok !== null;
  }

  is_err(): boolean {
    return this.error !== null;
  }

  // Applies a specified function to an `ok` value. Otherwise, `undefined` is returned.
  map<V>(f: (a: T | null) => V): V | undefined {
    if (this.is_ok()) {
      return f(this.ok!);
    } else {
      return undefined;
    }
  }

  // Applies a specified function to an `error` value. Otherwise, `undefined` is returned.
  map_err<V>(f: (error: U | null) => V): V | undefined {
    if (this.is_err()) {
      return f(this.error!);
    } else {
      return undefined;
    }
  }
}

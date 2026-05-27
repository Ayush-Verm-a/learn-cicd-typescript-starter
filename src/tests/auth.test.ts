import { getAPIKey } from "../api/auth.js";
import { describe, expect, test } from "vitest";

const person = {
  isActive: true,
  age: 32,
};

describe("getApiKey", () => {
  test("auth header is empty", () => {
    const headers = {};
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("api key is not present", () => {
    const headers = {
      authorization: "ApiKey",
    };
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("authorization header is invalid", () => {
    const headers = {
      authorization: "Api 1234",
    };
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("api key is present", () => {
    const headers = {
      authorization: "ApiKey 1234abcd",
    };
    const key = getAPIKey(headers);
    expect(key).toBe("1234abcd");
  });
});

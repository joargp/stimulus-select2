import { describe, it, expect } from "vitest";
import { parseSelect2OptionName } from "../src/parseSelect2OptionName.js";

describe("parseSelect2OptionName", () => {
  it("drops the select2 prefix and lowercases the first character", () => {
    expect(parseSelect2OptionName("select2Placeholder")).toBe("placeholder");
    expect(parseSelect2OptionName("select2Ajax")).toBe("ajax");
  });
});

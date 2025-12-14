import { Application } from "@hotwired/stimulus";
import $ from "jquery";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Select2Controller from "../src/index.js";

const createController = async html => {
  document.body.innerHTML = html;

  const application = Application.start();
  application.register("select2", Select2Controller);

  await Promise.resolve();

  const controller = application.controllers.find(
    ctrl => ctrl.identifier === "select2"
  );

  return { controller, application };
};

const stubSelect2 = () => {
  const select2Stub = vi.fn(function(actionOrOptions) {
    if (actionOrOptions && typeof actionOrOptions === "object") {
      this.data("select2", { initialized: true, options: actionOrOptions });
    }

    if (actionOrOptions === "destroy") {
      this.data("select2", null);
    }

    return this;
  });

  $.fn.select2 = select2Stub;
  return select2Stub;
};

beforeEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  delete $.fn.select2;
});

describe("Select2Controller", () => {
  it("initializes select2 with options derived from data attributes", async () => {
    const select2Stub = stubSelect2();

    const { controller, application } = await createController(`
      <select
        data-controller="select2"
        data-select2-placeholder="Pick a color"
        data-select2-width="style"
      >
        <option value="blue">Blue</option>
      </select>
    `);

    application.stop();

    expect(select2Stub).toHaveBeenCalledWith({
      placeholder: "Pick a color",
      width: "style"
    });
    expect(controller.select.data("select2")).toMatchObject({ initialized: true });
  });

  it("destroys the select2 instance when disconnected", async () => {
    const select2Stub = stubSelect2();

    const { controller, application } = await createController(
      '<select data-controller="select2"></select>'
    );

    controller.disconnect();
    application.stop();

    expect(select2Stub).toHaveBeenLastCalledWith("destroy");
    expect(controller.select.data("select2")).toBeNull();
  });

  it("throws a clear error when the select2 plugin is missing", () => {
    delete $.fn.select2;

    const controller = Object.create(Select2Controller.prototype);
    Object.defineProperty(controller, "element", {
      value: document.createElement("select")
    });

    expect(() => controller.connect()).toThrow(/Select2 was not found/);
  });
});

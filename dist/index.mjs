import { Controller } from '@hotwired/stimulus';
import $ from 'jquery';

const parseSelect2OptionName = item => {
  const option = item.slice(7);
  return option.charAt(0).toLowerCase() + option.slice(1);
};

class index extends Controller {
  get jQuery() {
    if (this._jQuery) return this._jQuery;
    const globalJQuery = typeof window !== "undefined" ? window.jQuery || window.$ : undefined;
    const resolved = $.fn ? $ : globalJQuery;
    if (!resolved || !resolved.fn) {
      throw new Error("stimulus-select2 requires jQuery. Make sure it is loaded before the controller connects.");
    }
    this._jQuery = resolved;
    return this._jQuery;
  }
  get select() {
    return this.jQuery(this.element);
  }
  get options() {
    const data = this.select.data();
    const options = {};
    for (const item in data) {
      if (Object.prototype.hasOwnProperty.call(data, item) && item.indexOf("select2") > -1) {
        options[parseSelect2OptionName(item)] = data[item];
      }
    }
    return options;
  }
  connect() {
    this.ensureSelect2();
    this.select.select2(this.options);
  }
  disconnect() {
    if (this.hasSelect2Instance()) {
      this.select.select2("destroy");
    }
  }
  ensureSelect2() {
    if (typeof this.jQuery.fn.select2 !== "function") {
      throw new Error("Select2 was not found on the current jQuery instance. Import select2 before this controller connects.");
    }
  }
  hasSelect2Instance() {
    return !!this.select.data("select2");
  }
}

export { index as default };
//# sourceMappingURL=index.mjs.map

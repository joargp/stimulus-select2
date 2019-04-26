import { Controller } from 'stimulus';

export default class extends Controller {
  get select() {
    return $(this.element);
  }

  get options() {
    var options = {};
    const placeholder = this.data.get('placeholder');

    console.log(this.select.data());
    if (placeholder) {
      options = { ...options, placeholder };
    }
    return options;
  }
  connect() {
    this.select.select2(this.options);
  }

  disconnect() {
    this.select.select2('destroy');
  }
}


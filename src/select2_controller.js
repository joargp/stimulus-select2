import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['select']

  get select() {
    return $(this.selectTarget);
  }

  connect() {
    this.initializeSelect2();
  }

  initializeSelect2() {
    const placeholder = this.data.get('placeholder');

    this.select.select2({
      placeholder: placeholder
    });
  }

  select2unmount() {
    this.select.select2('destroy');
  }
}

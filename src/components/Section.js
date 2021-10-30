export default class Section {
  constructor({renderer}, containerSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(config) {
    config.forEach(item => {
      this._renderer(item);
    });
  }
}

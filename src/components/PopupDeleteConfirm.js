import Popup from './Popup.js';

export default class PopupDeleteConfirm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popup = selectorPopup;
    this._form = this._popup.querySelector('.popup__form');
  }

  handelFunction(someFunction) {
    this._function = someFunction;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._function();

      super.close();
    });

    super.setEventListeners();
  }
}

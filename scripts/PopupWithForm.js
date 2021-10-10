import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleFormSubmit}) {
    super(selectorPopup);
    this._popup = selectorPopup;
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    //this._popup.querySelector('.popup__form').reset();
    this.reset();

    super.close();
  }

  setEvetListeners() {
    this._popup.addEvetListener('submit', (evt) => {
      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEvetListeners();
  }
}

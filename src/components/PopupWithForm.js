import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._popup = selectorPopup;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__save-button');
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = this._saveButton.textContent += "...";
    } else {
      this._saveButton.textContent = this._saveButton.textContent.slice(0, -3);
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    this._form.reset();

    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);

      this._handleFormSubmit(this._getInputValues());
      //this.close();
    });

    super.setEventListeners();
  }
}

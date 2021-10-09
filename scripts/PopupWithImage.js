import Popup from '../scripts/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popup = selectorPopup;
  }

  open({link, name}) {
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__title-card').textContent = name;
    this._popup.querySelector('.popup__title-card').alt = name;

    super.open();
  }
}

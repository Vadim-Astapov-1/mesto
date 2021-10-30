import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._title = this._popup.querySelector('.popup__title-card');
    this._image = this._popup.querySelector('.popup__image');
  }

  open({link, name}) {
    this._title.textContent = name;
    this._title.alt = name;
    this._image.src = link;

    super.open();
  }
}

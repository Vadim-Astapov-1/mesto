import {cardPopup, popupImageCard, popupTitleCard, openPopup} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup() {
    popupImageCard.src = this._link;
    popupImageCard.alt = this._name;
    popupTitleCard.textContent = this._name;

    openPopup(cardPopup);
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__like-button')) {
        evt.target.classList.toggle('element__like-button_active');
      }
    });

    this._element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__remove-button')) {
        this._element.remove();
      }
    });

    this._element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__image')) {
        this._handleOpenPopup();
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }
}



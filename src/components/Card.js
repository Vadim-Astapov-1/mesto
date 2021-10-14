export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._toggleLikeButton);

    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
}



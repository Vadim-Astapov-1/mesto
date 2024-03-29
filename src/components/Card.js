export default class Card {
  constructor({data, handleCardClick, handleCardLike, handleCardDelete}, cardSelector, userApi) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector;
    this._userApi = userApi;
  }

  // Проверка. Если уже лайкнул карту, пусть кнопка лайка будет активной
  _checkIsLiked() {
      this._data.likes.some(item => {
        if(item._id === this._userApi) {
          this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        }
      })
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleCardLike);

    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._checkIsLiked();

    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._like = this._element.querySelector('.element__like-count');

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._like.textContent = this._likeCount;

    return this._element;
  }
}



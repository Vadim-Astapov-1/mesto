export const editPopup = document.querySelector('.popup_type_edit');
export const editButton = document.querySelector('.profile__edit-button');

export const editAvatarPopup = document.querySelector('.popup_type_avatar');
export const editAvatarButton = document.querySelector('.profile__avatar-button');

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const addPopup = document.querySelector('.popup_type_add');
export const addButton = document.querySelector('.profile__add-button');

export const cardPopup = document.querySelector('.popup_type_card');

export const confirmPopup = document.querySelector('.popup_type_confirm');

export const elements = document.querySelector('.elements');
// Элементы, куда должны быть вставлены значения полей
export const avatar = document.querySelector('.profile__avatar');
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__job');
export const profile = document.querySelector('.profile');

// Обьект для валидации
export const config = {
  // formSelector больше не нужен
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


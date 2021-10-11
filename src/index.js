//import '../pages/index.css';

import Card from '../scripts/Card.js';
import FormValidator  from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
// Переменные надо собирать сверху
export const popupList = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
// Находим форму в DOM
const formEdit = document.querySelector('.popup__form_type_edit');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.popup__form_type_add');
const namePlaceInput = document.querySelector('.popup__input_type_place-name');
const linkPlaceInput = document.querySelector('.popup__input_type_place-link');

export const cardPopup = document.querySelector('.popup_type_card');
export const popupImageCard = document.querySelector('.popup__image');
export const popupTitleCard = document.querySelector('.popup__title-card');

const elements = document.querySelector('.elements');
// Элементы, куда должны быть вставлены значения полей
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Обьект для валидации
const config = {
  // formSelector больше не нужен
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Экземпляры валидированных форм
const validatorEditForm = new FormValidator(config, '.popup__form_type_edit');
const validatorAddForm = new FormValidator(config, '.popup__form_type_add');

// Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    popupList.forEach(function (item) {
      if(item.classList.contains('popup_opened')) {
        closePopup(item);
      }
    });
  }
};



//function createCard(configCard, cardSelector) {
  //const cardElement = new Card(configCard, cardSelector).generateCard();
  //return cardElement;
//}

const popupWithCard = new PopupWithImage(cardPopup);
popupWithCard.setEvetListeners();


//const popupFormEdit = new PopupWithForm({
  //selectorPopup: editPopup,
  //handleFormSubmit: '',
//});
//popupFormEdit.setEvetListeners();

const popupFormAddCard = new PopupWithForm(
  addPopup,
  (data) => {
    const dataCard = [data];

    const nextCard = new Section({
      items: dataCard,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: () => {
            popupWithCard.open(item);
          }
        }, '.element-template');
        const createdCard = card.generateCard();
        nextCard.addItem(createdCard);
      }
    }, elements);

    nextCard.renderItems();
  }
);

popupFormAddCard.setEvetListeners();

// Первые 6 карточек
const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = new Card({
      data: item,
      handleCardClick: () => {
        popupWithCard.open(item);
      }
    }, '.element-template');
    const initialCardElement = initialCard.generateCard();
    initialCardList.addItem(initialCardElement);
  }
}, elements);

initialCardList.renderItems();

editButton.addEventListener('click', function() {
  openPopup(editPopup);

  // В момент открытия попапа данные из профиля должны вставляться в форму.
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  validatorEditForm.resetValidation();
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


addButton.addEventListener('click', function() {
  openPopup(addPopup);
  validatorAddForm.resetValidation();
});



// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

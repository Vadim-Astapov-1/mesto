import './index.css';

import Card from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_card');

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

//function createCard(configCard, cardSelector) {
  //const cardElement = new Card(configCard, cardSelector).generateCard();
  //return cardElement;
//}

const userProfile = new UserInfo({
  selectorName: nameProfile,
  selectorAbout: jobProfile
});

const getValuesProfile = () => {
  const values = userProfile.getUserInfo();

  nameInput.value = values.name;
  jobInput.value = values.about;
}


const popupFormEdit = new PopupWithForm(
  editPopup,
  (dataForm) => {
    const user = new UserInfo({
      selectorName: nameProfile,
      selectorAbout: jobProfile
    });

    user.setUserInfo(dataForm);
  }
);

const popupFormAddCard = new PopupWithForm(
  addPopup,
  (dataForm) => {
    const dataCard = [dataForm];

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

const popupWithCard = new PopupWithImage(cardPopup);

editButton.addEventListener('click', function() {
  popupFormEdit.open();

  // В момент открытия попапа данные из профиля должны вставляться в форму.
  getValuesProfile();

  validatorEditForm.resetValidation();
});

popupFormEdit.setEvetListeners();
popupFormAddCard.setEvetListeners();
popupWithCard.setEvetListeners();

addButton.addEventListener('click', function() {
  popupFormAddCard.open();
  validatorAddForm.resetValidation();
});

// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

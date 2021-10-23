import './index.css';

import Card from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  editPopup,
  editButton,
  nameInput,
  jobInput,
  addPopup,
  addButton,
  cardPopup,
  elements,
  nameProfile,
  jobProfile,
  config,
  initialCards
} from '../utils/constants.js'

// Экземпляры валидированных форм
const validatorEditForm = new FormValidator(config, '.popup__form_type_edit');
const validatorAddForm = new FormValidator(config, '.popup__form_type_add');

// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();

function createCard(configCard, cardSelector) {
  const cardElement = new Card({
    data: configCard,
    handleCardClick: () => {
      popupWithCard.open(configCard);
    }
  }, cardSelector).generateCard();

  return cardElement;
}

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
    userProfile.setUserInfo(dataForm);
  }
);

const popupFormAddCard = new PopupWithForm(
  addPopup,
  (dataForm) => {
    const dataCard = [dataForm];

    const nextCard = new Section({
      items: dataCard,
      renderer: (item) => {
        nextCard.addItem(createCard(item, '.element-template'));
      }
    }, elements);
    nextCard.renderItems();
  }
);

const popupWithCard = new PopupWithImage(cardPopup);

// Первые 6 карточек
const cardListApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29/cards',
  method: 'GET',
  headers: {
    authorization: '48b4784f-cf14-43a9-b48d-b9db9c186300',
    'Content-Type': 'application/json'
  }
});
const cardList = cardListApi.getInitialCards();
cardList
  .then((data) => {
  const List = new Section({
    items: data,
    renderer: (item) => {
      List.addItem(createCard(item, '.element-template'));
    }
  }, elements);

  List.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });


popupFormEdit.setEventListeners();
popupFormAddCard.setEventListeners();
popupWithCard.setEventListeners();

editButton.addEventListener('click', function() {
  popupFormEdit.open();

  // В момент открытия попапа данные из профиля должны вставляться в форму.
  getValuesProfile();

  validatorEditForm.resetValidation();
});

addButton.addEventListener('click', function() {
  popupFormAddCard.open();
  validatorAddForm.resetValidation();
});

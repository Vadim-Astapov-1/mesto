// Переменные надо собирать сверху
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
// Находим форму в DOM
const formEdit = document.querySelector('.popup__form_type_edit');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtonAdd = document.querySelector('.popup__close-button_type_add');
const formAdd = document.querySelector('.popup__form_type_add');
const namePlaceInput = document.querySelector('.popup__input_type_place-name');
const linkPlaceInput = document.querySelector('.popup__input_type_place-link');

const cardPopup = document.querySelector('.popup_type_card');
const closeButtonCard = document.querySelector('.popup__close-button_type_card');
const popupCard = document.querySelector('.popup__image');
const popupTitleCard = document.querySelector('.popup__title-card');

const elements = document.querySelector('.elements');
// Элементы, куда должны быть вставлены значения полей
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
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

// В момент открытия попапа данные из профиля должны вставляться в форму.
function editProfile() {
  editPopup.classList.add('popup_opened');

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfile() {
  editPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы и перезапуск страницы
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    // Закрытие popup
    closeProfile();
}

function openCardCreator() {
  addPopup.classList.add('popup_opened');
}

function closeCardCreator() {
  addPopup.classList.remove('popup_opened');
}


function createCard(item) {
  const elementTemplate = document.querySelector('.element-template').content;
  // Замечание на будущее: ".element" находиться больше не в document, а в elementTemplate!!!
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;

  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupCard.src = cardElement.querySelector('.element__image').src;
    popupCard.alt = cardElement.querySelector('.element__title').textContent;
    popupTitleCard.textContent = cardElement.querySelector('.element__title').textContent;

    cardPopup.classList.add('popup_opened');
  });

  cardElement.querySelector('.element__remove-button').addEventListener('click', function () {
    cardElement.remove();
  });

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  elements.prepend(cardElement);

  closeCardCreator();
}

function closeImagePopup() {
  cardPopup.classList.remove('popup_opened');
}

// Первые 6 карточек
initialCards.forEach(createCard);

editButton.addEventListener('click', editProfile);
closeButtonEdit.addEventListener('click', closeProfile);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', openCardCreator);
closeButtonAdd.addEventListener('click', closeCardCreator);
formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const name = document.querySelector('.popup__input_type_place-name');
  const link = document.querySelector('.popup__input_type_place-link');

  // Делаем массив
  const card = {
    name: name.value,
    link: link.value
  };

  createCard(card);

  name.value = '';
  link.value = '';
});

closeButtonCard.addEventListener('click', closeImagePopup);



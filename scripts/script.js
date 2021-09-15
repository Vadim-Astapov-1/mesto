// Переменные надо собирать сверху
const popups = document.querySelectorAll('.popup');

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
const createCardButton = document.querySelector('.popup__save-button_type_create');

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

function disableButton (button) {
  button.classList.add('popup__save-button_inactive');
}

// В момент открытия попапа данные из профиля должны вставляться в форму.
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // С click все работает верно, функция closePopupEsc удаляется. С keydown начинает работать некорректно. При нажатии на что-то closePopupEsc не работает и не закроет попап.
  document.removeEventListener('click', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    popups.forEach(function (item) {
      if(item.classList.contains('popup_opened')) {
        closePopup(item);
      }
    });
    console.log('keydown в popup сработал');
  }
};

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
    closePopup(editPopup);
}

// Отдельная функция создания карточки
function createCard(name, link) {
  const elementTemplate = document.querySelector('.element-template').content;
  // Замечание на будущее: ".element" находиться больше не в document, а в elementTemplate!!!
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  cardImage.addEventListener('click', function () {
    popupCard.src = link;
    popupCard.alt = name;
    popupTitleCard.textContent = name;

    openPopup(cardPopup);
  });

  cardElement.querySelector('.element__remove-button').addEventListener('click', function () {
    cardElement.remove();
  });

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  return cardElement;
}

// Отдельная функция добавления
function addCard(elements, cardElement) {
  elements.prepend(cardElement);
}

// Первые 6 карточек
initialCards.forEach(function (item) {
  addCard(elements, createCard(item.name, item.link));
});

editButton.addEventListener('click', function() {
  openPopup(editPopup);

  // В момент открытия попапа данные из профиля должны вставляться в форму.
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

closeButtonEdit.addEventListener('click', function() {
  closePopup(editPopup);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function() {
  openPopup(addPopup);
});

closeButtonAdd.addEventListener('click', function() {
  closePopup(addPopup);
});

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  // Делаем обьект
  const card = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };

  // Добавим карточку
  addCard(elements, createCard(card.name, card.link));

  closePopup(addPopup);

  //Очищение формы лучше реализовать с помощью встроенного метода reset, очищающего всю форму
  formAdd.reset();
  disableButton(createCardButton);
});

closeButtonCard.addEventListener('click', function() {
  closePopup(cardPopup);
});

// Закрытие popupов при нажатие на overlay.
popups.forEach( function(item) {
  item.addEventListener('click', function (evt) {
    closePopup(evt.target);
  });
});


import Card from './Card.js';
import FormValidator  from './FormValidator.js';
// Переменные надо собирать сверху
const popupList = document.querySelectorAll('.popup');

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

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы и перезапуск страницы

    // Вставьте новые значения
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(editPopup);
}

function createCard(configCard, cardSelector) {
  const cardElement = new Card(configCard, cardSelector).generateCard();
  return cardElement;
}

// Отдельная функция добавления
function addCard(elements, cardElement) {
  elements.prepend(cardElement);
}

// Первые 6 карточек
initialCards.forEach((item) => {
  addCard(elements, createCard(item, '.element-template'));
});

editButton.addEventListener('click', function() {
  openPopup(editPopup);

  // В момент открытия попапа данные из профиля должны вставляться в форму.
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  validatorEditForm.resetValidation();
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function() {
  openPopup(addPopup);
  validatorAddForm.resetValidation();
});

formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  // Делаем обьект
  const dataCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };

  // Добавим карточку
  addCard(elements, createCard(dataCard, '.element-template'));

  closePopup(addPopup);

  //Очищение формы лучше реализовать с помощью встроенного метода reset, очищающего всю форму
  formAdd.reset();
});

// Вешаем обработчики событий на popupы
popupList.forEach( function(item) {
  item.addEventListener('click', function (evt) {
    // Закрытие при нажатии на overlay
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item);
    }

    // Закрытие при нажатии на крестик
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  });
});

// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
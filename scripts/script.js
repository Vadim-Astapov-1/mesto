// Переменные надо собирать сверху
let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
// Элементы, куда должны быть вставлены значения полей
let nameProfile = content.querySelector('.profile__name');
let jobProfile = content.querySelector('.profile__job');

// В момент открытия попапа данные из профиля должны вставляться в форму.
// В форму из профиля.
function editProfile() {
  popup.classList.add('popup_opened');

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    // Закрытие popup
    closeProfile();
}

editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeProfile);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

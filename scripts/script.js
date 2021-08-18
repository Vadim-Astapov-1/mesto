let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');

function editProfile() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editProfile);

function closeProfile() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeProfile);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(nameInput.value);
    console.log(jobInput.value);
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameProfile = content.querySelector('.profile__name');
    let jobProfile = content.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

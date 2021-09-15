// Многие аргументы повторяются в функциях т.к они используются в функции, которая уже в функции и так далее.
// Чтобы ее использовать так глубоко надо передать ее как аргументы в функции выше.

// Показ ошибки
const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  // Перед тем как показать ошибку надо найти ее текст. Свойство validationMessage браузер сам заполнит текстом
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

// Скрытие ошибки
const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent= '';
};

// Функция проверки на валидность.
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Ищем id c #
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  }
};

// Функция поиска инвалидного импута
const hasInvalidInput = (inputList) => {
  // Логика - если хоть один input не валидный то вернет true
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

// Функция проверки значений полей
const hasNotInputValue = (inputList) => {
  // Проверка каждого поля на 0
  return inputList.every(inputElement => {
    return inputElement.value.lenght === 0;
  })
};

// Функция выкл кнопки
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
};

// Функция вкл кнопки
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
};

// Фунция смены состояния кнопки
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasNotInputValue(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

// Функция установки обработчика события
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  // Вешаем обработчик события на submit чтобы ничего не происходило
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // Находим все инпуты именно в форме
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    // Вешаем обработчик события на input
    inputElement.addEventListener('input', () => {
      // На валидность будет проверятся как раз inputElement
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // После проверки валидности input переключим состояние кнопки submit.(Сохранить, создать)
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
  // Запустим ее сразу чтобы при открытии формы кнопка была не активна если поля пустые
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

// Функция вкл валидации
const enableValidation = (date) => {
  // Нашли все формы
  const formList = document.querySelectorAll(date.formSelector);
  // Устанавливаем для каждой формы слушатели событий
  formList.forEach(formElement => {
    setEventListeners(formElement, date.inputSelector, date.submitButtonSelector, date.inputErrorClass, date.errorClass, date.inactiveButtonClass);
  });
};

// Вызов валидации. Она будет проверять этот обьект.
enableValidation({
  // Большая разница Selector пишется с точкой(.), а класс нет
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});



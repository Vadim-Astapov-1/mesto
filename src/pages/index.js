import './index.css';

import Card from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  editPopup,
  editButton,
  editAvatarPopup,
  editAvatarButton,
  nameInput,
  jobInput,
  addPopup,
  addButton,
  cardPopup,
  confirmPopup,
  elements,
  avatar,
  nameProfile,
  jobProfile,
  profile,
  config
} from '../utils/constants.js'

let userId = null;

// Экземпляры валидированных форм
const validatorEditForm = new FormValidator(config, '.popup__form_type_edit');
const validatorAddForm = new FormValidator(config, '.popup__form_type_add');
const validatorAvatarForm = new FormValidator(config, '.popup__form_type_avatar');

// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();

function createCard(configCard, cardSelector, id) {
  const cardElement = new Card({
    data: configCard,
    handleCardClick: () => {
      popupWithCard.open(configCard);
    },
    handleCardLike: (evt) => {
      if(!evt.target.classList.contains('element__like-button_active')) {
        api.putLike(configCard._id)
        .then((res) => {
          evt.target.classList.add('element__like-button_active');
          cardElement.querySelector('.element__like-count').textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
      }
      if(evt.target.classList.contains('element__like-button_active')) {
        api.deleteLike(configCard._id)
        .then((res) => {
          evt.target.classList.remove('element__like-button_active');
          cardElement.querySelector('.element__like-count').textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    handleCardDelete: () => {
      popupConfirm.open();
      // вставляем какую ходим функцию
      popupConfirm.handelFunction(() => {
        api.deleteCard(configCard._id)
        .then(() => {
          cardElement.remove();
        })
        .then(() => {
          popupConfirm.close();
        })
        .catch(err => {
          console.log(err);
        });
      });
    }
  }, cardSelector, id).generateCard();

  return cardElement;
}

const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item, '.element-template', userId));
  },
}, elements);

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-29/',
  headers: {
    authorization: '48b4784f-cf14-43a9-b48d-b9db9c186300',
    'Content-Type': 'application/json'
  }
});

const userProfile = new UserInfo({
  selectorName: nameProfile,
  selectorAbout: jobProfile,
  selectorAvatar: avatar,
  selectorProfile: profile
});

const getValuesProfile = () => {
  const values = userProfile.getUserInfo();

  nameInput.value = values.name;
  jobInput.value = values.about;
};

const popupFormEditAvatar = new PopupWithForm(
  editAvatarPopup,
  (avatarData) => {
    api.editAvatar(avatarData)
      .then(data => {
        userProfile.setUserInfo(data);
      })
      .then(() => {
        popupFormEditAvatar.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupFormEditAvatar.renderLoading(false);
      });
  }
);

const popupFormEdit = new PopupWithForm(
  editPopup,
  (dataForm) => {
    api.editProfile(dataForm)
      .then(data => {
        userProfile.setUserInfo(data);
      })
      .then(() => {
        popupFormEdit.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupFormEdit.renderLoading(false);
      });
  }
);

const popupFormAddCard = new PopupWithForm(
  addPopup,
  (dataForm) => {
      api.addCard(dataForm)
        .then((res) => {
          section.renderItems([res]);
        })
        .then(() => {
          popupFormAddCard.close();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          popupFormAddCard.renderLoading(false);
        });
  }
);

const popupWithCard = new PopupWithImage(cardPopup);

const popupConfirm = new PopupConfirm(confirmPopup);

// Загрузка профиля
const userData = api.getUserData();
const cardList = api.getCards();
Promise.all([userData, cardList])
  .then(([user, cards]) => {
  userId = user._id;
  userProfile.setUserInfo(user);
  section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

popupFormEdit.setEventListeners();
popupFormAddCard.setEventListeners();
popupWithCard.setEventListeners();
popupConfirm.setEventListeners();
popupFormEditAvatar.setEventListeners();


editAvatarButton.addEventListener('click', function() {
  popupFormEditAvatar.open();
  validatorAvatarForm.resetValidation();
});

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

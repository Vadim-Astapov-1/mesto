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

// Экземпляры валидированных форм
const validatorEditForm = new FormValidator(config, '.popup__form_type_edit');
const validatorAddForm = new FormValidator(config, '.popup__form_type_add');
const validatorAvatarForm = new FormValidator(config, '.popup__form_type_avatar');

// Вкл валидации
validatorEditForm.enableValidation();
validatorAddForm.enableValidation();
validatorAvatarForm.enableValidation();

function createCard(configCard, cardSelector) {
  const cardElement = new Card({
    data: configCard,
    handleCardClick: () => {
      popupWithCard.open(configCard);
    },
    handleCardLike: (evt) => {
      if(!evt.target.classList.contains('element__like-button_active')) {
        apiData.putData('cards/likes/', configCard._id)
        .then((res) => {
          evt.target.classList.add('element__like-button_active');
          cardElement.querySelector('.element__like-count').textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
      }
      if(evt.target.classList.contains('element__like-button_active')) {
        apiData.deleteData('cards/likes/', configCard._id)
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
        apiData.deleteData('cards/', configCard._id)
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
  }, cardSelector, userData).generateCard();

  return cardElement;
}

//const section = new Section({
  //items: item,
  //renderer: (item) => {
    //section.addItem(createCard(item, '.element-template'));
  //},
//}, elements);

//section.renderItems();

const apiData = new Api({
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
    apiData.patchData('users/me/avatar', avatarData)
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
    apiData.patchData('users/me', dataForm)
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
    dataForm.likes = Array(0);
    const dataCard = [dataForm];

    const nextCard = new Section({
      items: dataCard,
      renderer: (item) => {
        //nextCard.saveItem(item, createCard(item, '.element-template'));
        apiData.addData('cards/', item)
        .then((data) => {
          nextCard.addItem(createCard(data, '.element-template'));
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
    }, elements);
    nextCard.renderItems();
  }
);

const popupWithCard = new PopupWithImage(cardPopup);

const popupConfirm = new PopupConfirm(confirmPopup);

// Загрузка профиля
const userData = apiData.getData('users/me');
userData
  .then(data => {
    userProfile.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

// Загрузка карточек
apiData.getData('cards/')
  .then((data) => {
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      cardList.addItem(createCard(item, '.element-template'));
    }
  }, elements);

  cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

  //const accountPromoses = [userData, cardListApi]
  //Promise.all(accountPromoses)
    //then(data => {
      //console.log(data);
    //})

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

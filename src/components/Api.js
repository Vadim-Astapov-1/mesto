export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  putLike(_id) {
    return fetch(`${this._url}cards/likes/${_id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  deleteLike(_id) {
    return fetch(`${this._url}cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._url}cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}cards/`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

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

  putData(way, _id) {
    return fetch(`${this._url}${way}${_id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  patchData(way, data) {
    return fetch(`${this._url}${way}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteData(way, _id) {
    return fetch(`${this._url}${way}${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  addData(way, data) {
    return fetch(`${this._url}${way}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  getData(way) {
    return fetch(`${this._url}${way}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

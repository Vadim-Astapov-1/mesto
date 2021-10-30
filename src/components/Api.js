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

  putData(_id) {
    return fetch(`${this._url}${_id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  patchData(data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteData(_id) {
    return fetch(`${this._url}${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  addData(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  getData() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}

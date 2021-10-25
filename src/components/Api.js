export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  patchData(data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  deleteData(_id) {
    return fetch(`${this._url}${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  addData(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  getData() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
}

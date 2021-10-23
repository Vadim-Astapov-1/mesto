export default class Api {
  constructor(options) {
    this._url = options.url;
    this._method = options.method;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._url, {
      method: this._method,
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

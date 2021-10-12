export default class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._name = selectorName;
    this._about = selectorAbout;
  }

  getUserInfo() {
    this._data =  {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._data;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

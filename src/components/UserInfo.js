export default class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar, selectorProfile }) {
    this._name = selectorName;
    this._about = selectorAbout;
    this._avatar = selectorAvatar
    this._profileId = selectorProfile;
  }

  getUserInfo() {
    this._data =  {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._data;
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this._profileId.id = _id;
  }
}

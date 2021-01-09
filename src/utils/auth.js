import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Username = 'User-Name'
const Id = 'ID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setName(username) {
  return Cookies.set(Username, username)
}
export function getName(username) {
  return Cookies.get(Username)
}

export function setId(id) {
  return Cookies.set(Id, id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


import request from '@/utils/request'
import UrlLogin from './urlApi'
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }

  return request({
    url: UrlLogin.login,
    method: 'post',
    data
  })
}

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  }
  return request({
    url: UrlLogin.login,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: UrlLogin.profile,
    method: 'post'
  })
}


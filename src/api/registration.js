import request from '@/utils/request'
import UrlApi from './urlApi'
export function RegistrationByEmail(userInfo) {
  const data = {
    email: userInfo.email,
    password: userInfo.password,
    password_confirm: userInfo.password_confirm,
    name: userInfo.name
  }
  return request({
    url: UrlApi.registration,
    method: 'post',
    data
  })
}

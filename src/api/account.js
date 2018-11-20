import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'accounts',
    method: 'get',
    params: query
  })
}

export function fetchAccount(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createAccount(data) {
  return request({
    url: 'accounts',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: `accounts/${data.id}`,
    method: 'put',
    data
  })
}
export function deleteAccount(data) {
  return request({
    url: `accounts/${data._id}`,
    method: 'delete'
  })
}
export function uploadCsv(data) {
  const formData = new FormData()
  formData.append('csvFile', data)
  return request({
    url: 'accounts/upload-csv',
    method: 'post',
    data: formData
  })
}

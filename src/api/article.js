import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'accounts',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
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

export function createArticle(data) {
  return request({
    url: 'accounts',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: `accounts/${data.id}`,
    method: 'put',
    data
  })
}

import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo () {
  return request({
    url: '/user/get/current_user',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUser (id) {
  return request({
    url: '/user/get/' + id,
    method: 'get'
  })
}

export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

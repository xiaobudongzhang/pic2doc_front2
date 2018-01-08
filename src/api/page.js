import request from '@/utils/request'

export function Add(data) {
  return request({
    url: '/Page/Add',
    method: 'post',
    data: data
  })
}

export function List(data) {
  return request({
    url: '/Page/List',
    method: 'get',
    data: data
  })
}

export function Update(data) {
  return request({
    url: '/Page/Update',
    method: 'post',
    data: data
  })
}

export function Delete(id) {
  return request({
    url: `/Page/Delete?id=${id}`,
    method: 'get'
  })
}

export function Detail(id) {
  return request({
    url: `/Page/Detail?id=${id}`,
    method: 'get'
  })
}


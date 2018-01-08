import request from '@/utils/request'

export function Add(data) {
  return request({
    url: '/Project/Add',
    method: 'post',
    data: data
  })
}

export function List(data) {
  return request({
    url: '/Project/List',
    method: 'get',
    data: data
  })
}

export function Update(data) {
  return request({
    url: '/Project/Update',
    method: 'post',
    data: data
  })
}

export function Delete(id) {
  return request({
    url: `/Project/Delete?id=${id}`,
    method: 'get'
  })
}


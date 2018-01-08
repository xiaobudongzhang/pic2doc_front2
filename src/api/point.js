import request from '@/utils/request'

export function Add(data) {
  return request({
    url: '/Point/Add',
    method: 'post',
    data: data
  })
}

export function List(data) {
  return request({
    url: '/Point/List',
    method: 'post',
    data: data
  })
}

export function Update(data) {
  return request({
    url: '/Point/Update',
    method: 'post',
    data: data
  })
}

export function Delete(id) {
  return request({
    url: `/Point/Delete?id=${id}`,
    method: 'get'
  })
}


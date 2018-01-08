import request from '@/utils/request'

export function Replace(data) {
  return request({
    url: '/PointDetail/Replace',
    method: 'post',
    data: data
  })
}

export function List(data) {
  return request({
    url: '/PointDetail/List',
    method: 'post',
    data: data
  })
}



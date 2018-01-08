import { Add, List, Update,Delete,Detail } from '@/api/page'

const project = {
  state: {

  },

  mutations: {

  },

  actions: {

    ['page/Add']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Add(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['page/Update']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Update(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['page/List']({ commit }, data) {
      return new Promise((resolve, reject) => {
        List(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['page/Delete']({ commit }, id) {
      return new Promise((resolve, reject) => {
        Delete(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['page/Detail']({ commit }, id) {
      return new Promise((resolve, reject) => {
        Detail(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default project

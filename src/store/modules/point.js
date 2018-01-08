import { Add, List, Update, Delete } from '@/api/point'

const project = {
  state: {

  },

  mutations: {

  },

  actions: {

    ['point/Add']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Add(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['point/Update']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Update(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['point/List']({ commit }, data) {
      return new Promise((resolve, reject) => {
        List(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['point/Delete']({ commit }, id) {
      return new Promise((resolve, reject) => {
        Delete(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default project

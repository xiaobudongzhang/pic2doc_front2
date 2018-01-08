import { Add, List, Update,Delete } from '@/api/project'

const project = {
  state: {

  },

  mutations: {

  },

  actions: {

    ['project/Add']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Add(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['project/Update']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Update(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['project/List']({ commit }, data) {
      return new Promise((resolve, reject) => {
        List(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['project/Delete']({ commit }, id) {
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

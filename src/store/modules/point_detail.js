import { Replace, List} from '@/api/point_detail'

const project = {
  state: {

  },

  mutations: {

  },

  actions: {

    ['point_detail/Replace']({ commit }, data) {
      return new Promise((resolve, reject) => {
        Replace(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ['point_detail/List']({ commit }, data) {
      return new Promise((resolve, reject) => {
        List(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default project

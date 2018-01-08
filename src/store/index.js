import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import project from './modules/project'
import page from './modules/page'
import point from './modules/point'
import point_detail from './modules/point_detail'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    project,
    page,
    point,
    point_detail
  },
  getters
})

export default store

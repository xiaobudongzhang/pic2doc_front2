import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/project',
    component: Layout,
    title: '页面管理',
    children: [
      {
        path: 'index',
        name: 'projectManage',
        component: _import('project/index'),
        meta: { title: '项目管理', icon: 'form' }
      },
      {
        path: 'page',
        hidden: true,
        name: 'pageManage',
        component: _import('page/index'),
        meta: { title: '页面管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/point',
    hidden: true,
    name: 'pointManage',
    component: _import('point/index'),
    meta: {
      title: '点管理',
      icon: 'form'
    }
  },
  {
    path: '/preview',
    hidden: true,
    name: 'point_preview',
    component: _import('point/preview'),
    meta: {
      title: '点管理预览',
      icon: 'form'
    }
  },
  { path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


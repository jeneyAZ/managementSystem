import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
]

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'ClassifiedManagement': {
        path: 'ClassifiedManagement',
        name: 'ClassifiedManagement',
        component: () => import('../views/ClassifiedManagement.vue')
    },
    'ArticleManagement': {
        path: 'ArticleManagement',
        name: 'ArticleManagement',
        component: () => import('../views/ArticleManagement.vue')
    },
    'AddArticle': {
        path: 'AddArticle',
        name: 'AddArticle',
        component: () => import('../views/AddArticle.vue')
    },
    'RecycleBin': {
        path: 'RecycleBin',
        name: 'RecycleBin',
        component: () => import('../views/RecycleBin.vue')
    },
    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'msg': {
        path: 'msg',
        name: 'msg',
        component: () => import('../views/Msg.vue')
    },
    'userinfo': {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    }
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
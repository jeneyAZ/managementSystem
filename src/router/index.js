import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import IndexBrowse from '../viewOther/IndexBrowse.vue';
// import Login from '../components/Login.vue';
// import BrowsePage from '../viewOther/BrowsePage.vue';
// import Commont from '../viewOther/commont.vue';
// import Index from '../components/Index.vue';
// import Home from '../views/Home.vue';
// import ClassifiedManagement from '../views/ClassifiedManagement.vue';
// import ArticleManagement from '../views/ArticleManagement.vue';
// import AddArticle from '../views/AddArticle.vue';
// import RecycleBin from '../views/RecycleBin.vue';
// import AppealManagement from '../views/AppealManagement.vue';
// import CommentManagement from '../views/CommentManagement.vue';
// import CommentDetail from '../views/CommentDetail.vue';
// import AdvertManagement from '../views/AdvertManagement.vue';
// import AddAdvert from '../views/AddAdvert.vue';

// const routes = [
//     {
//         path: '/', component: Home,
//         children: [
//             { path: "/ClassifiedManagement", component: ClassifiedManagement },
//             { path: "/ArticleManagement", component: ArticleManagement },
//             { path: "/AddArticle", component: AddArticle },
//             { path: "/RecycleBin", component: RecycleBin },
//             { path: "/AppealManagement", component: AppealManagement },
//             { path: "/CommentManagement", component: CommentManagement },
//             { path: "/CommentDetail", component: CommentDetail },
//             { path: "/AdvertManagement", component: AdvertManagement },
//             { path: "/AddAdvert", component: AddAdvert },
//         ]
//     },
//     { path: "/Login", name: "Login", component: Login },
//     { path: "/", name: "IndexBrowse", component: IndexBrowse },
//     { path: "/BrowsePage", name: "BrowsePage", component: BrowsePage },
//     { path: "/Commont", name: "Commont", component: Commont },
//     { path: "/Index", name: "Index", component: Index },


// ]

// const router = new Router({
//     mode: 'history',
//     routes
// })

const commonRoutes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/admin',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/browsePage',
        name: 'BrowsePage',
        component: () => import('../viewOther/BrowsePage.vue')
    },
    {
        path: '/indexBrowse',
        name: 'IndexBrowse',
        component: () => import('../viewOther/IndexBrowse.vue')
    },

    {
        path: '/index',
        name: 'Index',
        component: () => import('../components/Index.vue')
    },

    { path: '/', redirect: '/index'},
]

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'home': {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'ClassifiedManagement': {
        path: '/ClassifiedManagement',
        name: 'ClassifiedManagement',
        component: () => import('../views/ClassifiedManagement.vue')
    },
    'ArticleManagement': {
        path: '/ArticleManagement',
        name: 'ArticleManagement',
        component: () => import('../views/ArticleManagement.vue')
    },
    'AddArticle': {
        path: '/AddArticle',
        name: 'AddArticle',
        component: () => import('../views/AddArticle.vue')
    },
    'RecycleBin': {
        path: '/RecycleBin',
        name: 'RecycleBin',
        component: () => import('../views/RecycleBin.vue')
    },
    'AppealManagement': {
        path: '/AppealManagement',
        name: 'AppealManagement',
        component: () => import('../views/AppealManagement.vue')
    },
    'CommentManagement': {
        path: '/CommentManagement',
        name: 'CommentManagement',
        component: () => import('../views/CommentManagement.vue')
    },
    'CommentDetail': {
        path: '/CommentDetail',
        name: 'CommentDetail',
        component: () => import('../views/CommentDetail.vue')
    },
    'AdvertManagement': {
        path: '/AdvertManagement',
        name: 'AdvertManagement',
        component: () => import('../views/AdvertManagement.vue')
    },
    'AddAdvert': {
        path: '/AddAdvert',
        name: 'AddAdvert',
        component: () => import('../views/AddAdvert.vue')
    },

    'password': {
        path: '/password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'msg': {
        path: '/msg',
        name: 'msg',
        component: () => import('../views/Msg.vue')
    },
    'userinfo': {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    }
}

const createRouter = () => new Router({
    mode: "history",
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
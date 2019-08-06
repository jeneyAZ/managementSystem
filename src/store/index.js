import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            // {
            //     name: 'home', // 要跳转的路由名称 不是路径
            //     size: 18, // icon大小
            //     type: 'md-home', // icon类型
            //     text: '主页' // 文本内容
            // },
            {
                text: '文章管理',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'ClassifiedManagement',
                        text: '管理分类'
                    },
                    {
                        type: 'ios-grid',
                        name: 'ArticleManagement',
                        text: '文章管理'
                    },
                    {
                        type: 'ios-grid',
                        name: 'AddArticle',
                        text: '添加文章'
                    },
                    {
                        type: 'ios-grid',
                        name: 'ResetArticle',
                        text: '修改文章'
                    },
                    {
                        type: 'ios-grid',
                        name: 'RecycleBin',
                        text: '回收站'
                    },
                ]
            },
            {
                text: '投诉管理',
                type: 'ios-paper',
                children: [{
                        type: 'ios-grid',
                        name: 'AppealManagement',
                        text: '信息管理'
                    }
                ]
            },
            {
                text: '评论管理',
                type: 'ios-paper',
                children: [{
                    type: 'ios-grid',
                    name: 'CommentManagement',
                    text: '信息管理'
                },
                {
                    type: 'ios-grid',
                    name: 'CommentDetail',
                    text: '评论详情'
                }]
            },
            {
                text: '广告管理',
                type: 'ios-paper',
                children: [{
                    type: 'ios-grid',
                    name: 'AdvertManagement',
                    text: '管理广告'
                },
                {
                    type: 'ios-grid',
                    name: 'AddAdvert',
                    text: '添加广告'
                }, {
                    type: 'ios-grid',
                    name: 'ResetAdvert',
                    text: '修改广告'
                }]
            }
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store
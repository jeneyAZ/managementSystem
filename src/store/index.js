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
                        name: 'RecycleBin',
                        text: '回收站'
                    },
                ]
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
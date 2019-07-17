// PC官网
const BrowsePage = () => import('./viewOther/BrowsePage.vue')

const routes = [
  {
    path: '/',
    redirect: '/BrowsePage'
  },
  {
    path: '/BrowsePage',
    name: 'BrowsePage',
    component: BrowsePage
  },
]

export default new VueRouter({
  routes
})

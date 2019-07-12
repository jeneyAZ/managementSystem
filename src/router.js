// A方后台
const AIndex = () => import('./views/amodule/Index.vue')
const POSManagement = () => import('./views/amodule/POSManagement.vue')

const routes =  [
  { path: '/', redirect: '/aindex' },
  {
    path: '/aindex',
    name: 'aindex',
    component: AIndex,
    children: [
      { path: '/a_pos_management', name: 'POSManagement', component: POSManagement },
    ]
  },
]

export default new VueRouter({
  routes
})

import Layout from '@/page/index/'

export default [{
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/admin/user/info')
  }]
}, {
  path: '/activti',
  component: Layout,
  redirect: '/activti/detail',
  children: [{
    path: 'detail/:id',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/activiti/detail')
  }]
},{
  path:'/induction',
  component: Layout,
  redirect: '/induction/induction-info',
  children: [{
    path: 'induction-info/:id',
    component: () => import('@/components/induction-components/inductionView')
  }]
}

]

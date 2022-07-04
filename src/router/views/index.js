import Layout from '@/page/index/'

export default [{
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
      path: 'index',
      name: '个人信息',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/views/admin/user/info')
    }]
  },
  {
    path: '/activti',
    component: Layout,
    redirect: '/activti/detail',
    children: [{
      path: 'detail/:id',
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/activiti/detail')
    }]
  },
  {
    path: '/induction',
    component: Layout,
    redirect: '/induction/induction-info',
    children: [{
      path: 'induction-info/:id',
      component: () => import('@/components/induction-components/inductionView')
    }]
  },
  {
    path: '/mail',
    component: Layout,
    redirect: '/mail/handoff',
    children: [
      {
        path: 'handoff/:id',
        component: () => import('@/views/recruit/common/handoff')
      }
    ]
  },
  {
    path: '/im',
    component: Layout,
    redirect: '/im/detail',
    children: [{
      path: 'detail/:id',
      component:()=> import('@/views/recruit/communicate/communicate')
    }]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    children: [{
      path: 'index/:id',
      component: () => import('@/components/notice/index')
    }]
  },
  {
    path: '/subset',
    component: Layout,
    redirect: '/subset/index',
    children: [{
      path: 'index/:id',
      component: () => import('@/components/staff/subset/index')
    }]
  },
  {
    path: '/subset-set',
    component: Layout,
    redirect: '/subset-set/index',
    children: [{
      path: 'index/:id',
      component: () => import('@/components/staff/subset-set/index')
    }]
  },
  {
    path: '/external-child',
    component: Layout,
    redirect: '/external-child/index',
    children: [{
      path: 'index/:id',
      component: () => import('@/components/staff/external-child/index')
    }]
  },
]

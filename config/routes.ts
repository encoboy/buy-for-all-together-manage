export default [
  {
    path: '/',
    redirect: '/userManage',
  },
  {
    name: '登录',
    path: '/login',
    component: './Login/index',
    menuRender: false,
    hideInMenu: true,
    headerRender: false,
  },
  {
    name: '用户管理',
    icon: 'icon-user',
    path: '/userManage',
    component: '@/layouts/index',
    routes: [
      {
        name: '用户管理',
        icon: 'UserOutlined',
        path: '/userManage',
        component: 'UserManage/index',
        hideInMenu: true,
      },
      {
        name: '用户管理配置',
        path: '/userManage/edit',
        hideInMenu: true,
        component: 'UserManage/EditUserGood/index',
      },
      { redirect: '/userManage' },
    ],
  },
  {
    name: '商品管理',
    icon: 'icon-good',
    path: '/goodManage',
    component: '@/layouts/index',
    routes: [
      {
        name: '商品管理',
        icon: 'icon-good',
        path: '/goodManage',
        component: 'GoodManage/index',
        hideInMenu: true,
      },
      {
        name: '商品管理配置',
        path: '/goodManage/edit',
        hideInMenu: true,
        component: 'GoodManage/EditGood/index',
      },
    ],
  },
  {
    name: '订单管理',
    icon: 'icon-order',
    path: '/orderManage',
    component: '@/layouts/index',
    routes: [
      {
        name: '订单管理',
        icon: 'icon-order',
        path: '/orderManage',
        component: 'OrderManage/index',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '奖品管理',
    icon: 'icon-jiangpin',
    path: '/prizeManage',
    component: '@/layouts/index',
    routes: [
      {
        name: '奖品管理',
        icon: 'icon-jiangpin',
        path: '/prizeManage',
        component: 'PrizeManage/index',
        hideInMenu: true,
      },
      {
        name: '奖品管理配置',
        path: '/prizeManage/edit',
        hideInMenu: true,
        component: 'PrizeManage/EditPrizeGood/index',
      },
    ],
  },
  {
    path: '/test',
    menuRender: false,
    hideInMenu: true,
    layout: false,
    component: '@/pages/test/test.tsx',
  },
  {
    path: '/*',
    component: '@/pages/404.tsx',
  },
];

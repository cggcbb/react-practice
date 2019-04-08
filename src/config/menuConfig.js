const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    rootKey: '1',
    title: '设计',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/button'
      },
      {
        title: '弹窗',
        key: '/admin/ui/modal'
      },
      {
        title: 'Loading',
        key: '/admin/ui/loading'
      },
      {
        title: '通知提醒',
        key: '/admin/ui/notification'
      },
      {
        title: '全局Message',
        key: '/admin/ui/message'
      },
      {
        title: 'Tab页签',
        key: '/admin/ui/tab'
      },
      {
        title: '图片画廊',
        key: '/admin/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/admin/ui/carousel'
      }
    ]
  },
  {
    rootKey: '2',
    title: '表单',
    key: '/admin/ui',
    children: [
      {
        title: '注册',
        key: '/admin/form/register'
      },
      {
        title: '登录',
        key: '/admin/form/login'
      }
    ]
  },
  {
    title: '员工管理',
    key: '/admin/user'
  },
  {
    title: '车辆地图',
    key: '/admin/bikeMap'
  },
  {
    rootKey: '3',
    title: '图标',
    key: '/admin/charts',
    children: [
      {
        title: '柱状图',
        key: '/admin/charts/bar'
      },
      {
        title: '饼状图',
        key: '/admin/charts/pie'
      },
      {
        title: '折线图',
        key: '/admin/charts/line'
      }
    ]
  },
  {
    title: '富文本',
    key: '/admin/rich'
  },
  {
    title: '城市管理',
    key: '/admin/city'
  },
  {
    title: '权限管理',
    key: '/admin/permission'
  }
]

export default menuList
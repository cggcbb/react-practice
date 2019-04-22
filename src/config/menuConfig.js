const menuList = [
  {
    title: '首页',
    key: '/home'
  },
  {
    rootKey: '1',
    title: '设计',
    key: '/ui',
    children: [
      {
        title: '按钮',
        key: '/ui/button'
      },
      {
        title: '弹窗',
        key: '/ui/modal'
      },
      {
        title: 'Loading',
        key: '/ui/loading'
      },
      {
        title: '通知提醒',
        key: '/ui/notification'
      },
      {
        title: '全局Message',
        key: '/ui/message'
      },
      {
        title: 'Tab页签',
        key: '/ui/tab'
      },
      {
        title: '图片画廊',
        key: '/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/ui/carousel'
      }
    ]
  },
  {
    rootKey: '2',
    title: '表单',
    children: [
      {
        title: '注册',
        key: '/form/register'
      },
      {
        title: '登录',
        key: '/form/login'
      }
    ]
  },
  {
    rootKey: '3',
    title: '表格',
    children: [
      {
        title: '基础表格',
        key: '/table/basic'
      },
      {
        title: '高级表格',
        key: '/table/high'
      }
    ]
  },
  {
    rootKey: '4',
    title: '图标',
    children: [
      {
        title: '柱状图',
        key: '/charts/bar'
      },
      {
        title: '饼状图',
        key: '/charts/pie'
      },
      {
        title: '折线图',
        key: '/charts/line'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/order'
  },
  {
    title: '员工管理',
    key: '/user'
  },
  {
    title: '城市管理',
    key: '/city'
  },
  {
    title: '车辆地图',
    key: '/bikeMap'
  },
  {
    title: '富文本',
    key: '/rich'
  },
  {
    title: '权限管理',
    key: '/permission'
  }
]

export default menuList
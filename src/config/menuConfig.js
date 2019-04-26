const menuList = [
  {
    title: '首页',
    key: '/',
    icon: 'home'
  },
  {
    rootKey: '1',
    title: '设计',
    key: '/ui',
    icon: 'yuque',
    children: [
      {
        title: '按钮',
        key: '/ui/button',
        icon: 'fire'
      },
      {
        title: '弹窗',
        key: '/ui/modal',
        icon: 'flag'
      },
      {
        title: 'Loading',
        key: '/ui/loading',
        icon: 'loading'
      },
      {
        title: '通知提醒',
        key: '/ui/notification',
        icon: 'notification'
      },
      {
        title: '全局Message',
        key: '/ui/message',
        icon: 'message'
      },
      {
        title: 'Tab页签',
        key: '/ui/tab',
        icon: 'align-left'
      },
      {
        title: '图片画廊',
        key: '/ui/gallery',
        icon: 'gateway'
      },
      {
        title: '轮播图',
        key: '/ui/carousel',
        icon: 'interation'
      }
    ]
  },
  {
    rootKey: '2',
    title: '表单',
    key: '/form',
    icon: 'form',
    children: [
      {
        title: '注册',
        key: '/form/register',
        icon: 'select'
      },
      {
        title: '登录',
        key: '/form/login',
        icon: 'login'
      }
    ]
  },
  {
    rootKey: '3',
    title: '表格',
    key: '/table',
    icon: 'table',
    children: [
      {
        title: '基础表格',
        key: '/table/basic',
        icon: 'appstore'
      },
      {
        title: '高级表格',
        key: '/table/high',
        icon: 'block'
      }
    ]
  },
  {
    rootKey: '4',
    title: '图标',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱状图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '饼状图',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'schedule'
  },
  {
    title: '员工管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '城市管理',
    key: '/city',
    icon: 'share-alt'
  },
  {
    title: '车辆地图',
    key: '/bikeMap',
    icon: 'global'
  },
  {
    title: '富文本',
    key: '/rich',
    icon: 'read'
  },
  {
    title: '权限管理',
    key: '/permission',
    icon: 'lock'
  }
]

export default menuList
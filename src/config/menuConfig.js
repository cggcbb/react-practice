const menuList = [
  {
    title: '首页',
    key: '/index',
    icon: 'home'
  },
  {
    rootKey: '1',
    title: '设计',
    key: '/index/ui',
    icon: 'yuque',
    children: [
      {
        title: '按钮',
        key: '/index/ui/button',
        icon: 'fire'
      },
      {
        title: '弹窗',
        key: '/index/ui/modal',
        icon: 'flag'
      },
      {
        title: 'Loading',
        key: '/index/ui/loading',
        icon: 'loading'
      },
      {
        title: '通知提醒',
        key: '/index/ui/notification',
        icon: 'notification'
      },
      {
        title: '全局Message',
        key: '/index/ui/message',
        icon: 'message'
      },
      {
        title: 'Tab页签',
        key: '/index/ui/tab',
        icon: 'align-left'
      },
      {
        title: '图片画廊',
        key: '/index/ui/gallery',
        icon: 'gateway'
      },
      {
        title: '轮播图',
        key: '/index/ui/carousel',
        icon: 'interation'
      }
    ]
  },
  {
    rootKey: '2',
    title: '表单',
    key: '/index/form',
    icon: 'form',
    children: [
      {
        title: '注册',
        key: '/index/form/register',
        icon: 'select'
      },
      {
        title: '登录',
        key: '/index/form/login',
        icon: 'login'
      }
    ]
  },
  {
    rootKey: '3',
    title: '表格',
    key: '/index/table',
    icon: 'table',
    children: [
      {
        title: '基础表格',
        key: '/index/table/basic',
        icon: 'appstore'
      },
      {
        title: '高级表格',
        key: '/index/table/high',
        icon: 'block'
      }
    ]
  },
  {
    rootKey: '4',
    title: '图表',
    key: '/index/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱状图',
        key: '/index/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '饼状图',
        key: '/index/charts/pie',
        icon: 'pie-chart'
      },
      {
        title: '折线图',
        key: '/index/charts/line',
        icon: 'line-chart'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/index/order',
    icon: 'schedule'
  },
  {
    title: '员工管理',
    key: '/index/user',
    icon: 'user'
  },
  {
    title: '城市管理',
    key: '/index/city',
    icon: 'share-alt'
  },
  {
    title: '车辆地图',
    key: '/index/bikeMap',
    icon: 'global'
  },
  {
    title: '富文本',
    key: '/index/rich',
    icon: 'read'
  },
  {
    title: '权限管理',
    key: '/index/permission',
    icon: 'lock'
  }
]

export default menuList
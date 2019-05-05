import { Row, Col } from 'antd'
import Footer from 'components/footer/footer'
import Header from 'components/header/header'
import Nav from 'components/nav/nav'
import menuConfig from 'config/menuConfig'
import { getBreadcrumb } from 'config/breadcrumb'
import { connect } from 'react-redux'
import { switchMenu } from '@/redux/action/action'
import React from 'react'

import 'style/common.less'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: [window.location.hash.replace(/#|\?.*$/g, '')],
      menuKeyTitleMap: this._getMenuTitleKey(menuConfig)
    }
  }
  // 获取所有 menu { key, title } 数组, 来初始化面包屑的默认title
  _getMenuTitleKey = (data) => {
    return data.map(item => {
      if (item.children) {
        return this._getMenuTitleKey(item.children)
      }
      let { key, title } = item
      return {
        key,
        title
      }
    }).flat()
  }
  componentWillMount() {
    let current = this.state.menuKeyTitleMap.filter(item => item.key === this.state.currentKey[0])
    let breadcrumb = getBreadcrumb(current[0])
    this._reduxDispatch(switchMenu, breadcrumb)
  }
  // 面包屑点击事件  因为这里设置了当前路由和有二级路由的菜单不能被点击(只有首页可以点击), 所以这里可以写死'/index'
  handleBreadcrumbClick = () => {
    this.setState({
      currentKey: ['/index']
    })
    this._reduxDispatch(switchMenu, [{ title: '首页', key: '/index' }])
  }
  // 菜单切换
  handleMenuChange = (key, breadcrumb) => {
    this.setState({
      currentKey: [key]
    })
    this._reduxDispatch(switchMenu, breadcrumb)
  }
  // dispatch action 更新 redux state
  _reduxDispatch = (func, props = '') => {
    const { dispatch } = this.props
    dispatch(func(props))
  }
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <Nav
            currentKey={this.state.currentKey}
            handleMenuChange={this.handleMenuChange}
          />
        </Col>
        <Col span={21} className="main">
          <Header handleBreadcrumbClick={this.handleBreadcrumbClick}></Header>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    )
  }
}

export default connect()(Admin)

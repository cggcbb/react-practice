import { Menu, Switch } from 'antd'
import { NavLink } from 'react-router-dom'
import menuConfig from 'config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu } from '@/redux/action/action'
import React from 'react'


const SubMenu = Menu.SubMenu

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rootSubmenuKeys: [],
      openKeys: [],
      theme: 'dark',
      navColor: '#fff',
      currentKey: [window.location.hash.replace(/#|\?.*$/g, '')]
    }
  }
  componentWillMount() {
    const menuTreeNode = this._renderMenu(menuConfig)
    // 获取rootSubmenuKeys
    const rootSubmenuKeys = menuConfig.map(item => {
      return item.rootKey
    }).filter(item => item)
    
    this.setState({
      menuTreeNode,
      rootSubmenuKeys,
    })
    this._reduxDispatch(switchMenu, 22222222222)
  }
  // 菜单渲染
  _renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.rootKey}>
            {this._renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }
  // 切换菜单
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !this.state.openKeys.includes(key))
    if (!this.state.rootSubmenuKeys.includes(latestOpenKey)) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
      navColor: value ? '#fff' : '#001529'
    })
    let dom = document.getElementsByClassName('nav-left')[0]
    dom.style.transition = '.3s'
    dom.style.backgroundColor = this.state.navColor
  }
  handleMenuChange = ({ item, key }) => {
    this._reduxDispatch(switchMenu, 1111)
    this.setState({
      currentKey: [key]
    })
  }
  _reduxDispatch = (func, props = '') => {
    const { dispatch } = this.props
    dispatch(func(props))
  }
  render() {
    return (
      <nav>
        <div className="logo-wrapper">
          <img src="/nav/logo.svg" alt="logo" width="32"/>
          <img src="/nav/logo_description.svg" alt="logo_description" width="80"/>
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className="nav-switch"
          />
        </div>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          theme={this.state.theme}
          style={{border: 'none'}}
          selectedKeys={this.state.currentKey}
          onClick={this.handleMenuChange}
        >
          {this.state.menuTreeNode}
        </Menu>
      </nav>
    )
  }
}

export default connect()(Nav)
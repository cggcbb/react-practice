import { Menu, Switch, Icon } from 'antd'
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
    const menuTreeNode = this._renderMenu(menuConfig)
    // 获取rootSubmenuKeys
    const rootSubmenuKeys = menuConfig.map(item => {
      return item.rootKey
    }).filter(item => item)

    this.setState({
      menuTreeNode,
      rootSubmenuKeys,
    })
    // 因为setState是异步操作, 在回调中才能拿到更新后的state
    let currentTitle = this.state.menuKeyTitleMap.filter(item => item.key === this.state.currentKey[0])[0].title
    this._reduxDispatch(switchMenu, currentTitle)
  }
  // 菜单渲染
  _renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={<span><Icon type={item.icon}/>{item.title}</span>} key={item.rootKey}>
            {this._renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <NavLink to={item.key} >
            <Icon type={item.icon}/>
            {item.title}
          </NavLink>
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
  // 修改主题
  changeTheme = (value) => {
    // 保证dom只获取一次
    const { dom = document.getElementsByClassName('nav-left')[0] } = this.state
    this.setState({
      theme: value ? 'dark' : 'light',
      navColor: value ? '#fff' : '#001529',
      dom
    })
    dom.style.transition = '.3s'
    dom.style.backgroundColor = this.state.navColor
  }
  // 切换菜单
  handleMenuChange = ({ item, key }) => {
    this._reduxDispatch(switchMenu, item.props.title)
    this.setState({
      currentKey: [key]
    })
  }
  // dispatch action 更新 redux state
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
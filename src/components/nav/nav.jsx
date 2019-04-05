import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import menuConfig from 'config/menuConfig'
import React from 'react'

const SubMenu = Menu.SubMenu

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rootSubmenuKeys: [],
      openKeys: [],
      theme: 'dark'
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
      rootSubmenuKeys
    })
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
  render() {
    return (
      <nav>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          theme={this.state.theme}
        >
          {this.state.menuTreeNode}
        </Menu>
      </nav>
    )
  }
}
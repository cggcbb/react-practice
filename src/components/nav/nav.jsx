import { Menu, Switch } from 'antd'
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
  handleMenuChange = ({ key }) => {
    this.setState({
      currentKey: [key]
    })
  }
  render() {
    return (
      <nav>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className="nav-switch"
        />
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
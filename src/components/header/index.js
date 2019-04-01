import { optimizeCurrentTime } from 'common/js/utils'
import { Row, Col } from 'antd'
import React from 'react'

import './index.less'

export default class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: 'cggcbb',
      sysTime: optimizeCurrentTime()
    })
    setInterval(() => {
      this.setState({
        sysTime: optimizeCurrentTime()
      })
    }, 1000)
  }
  render() {
    return (
      <header className="header">
        <Row className="header-user-info">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#" onClick={this.logout.bind(this)} className="logout">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">晴转多云</span>
          </Col>
        </Row>
      </header>
    )
  }
  logout() {
    console.log('click logout')
  }
}
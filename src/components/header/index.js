import './index.less'
import React from 'react'
import { Row, Col } from 'antd'

export default class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: 'cggcbb'
    })
  }
  render() {
    return (
      <header className="header">
        <Row className="header-userinfo">
          <Col span="24">
            <span>欢迎，{this.state.userName}</span>
            <a href="#" className="logout">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="4" className="breadcrumb-title">
            首页
          </Col>
          <Col span="20" className="weather">
            <span className="date">2019-04-01</span>
            <span className="weather-detail">晴转多云</span>
          </Col>
        </Row>
      </header>
    )
  }
}
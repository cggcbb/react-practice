import { getChengduWeather } from 'api/weather'
import { optimizeCurrentTime } from 'common/js/utils'
import { Row, Col } from 'antd'
import { SUCCESS_STATUS, SUCCESS_CODE } from 'common/js/config'
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
    // 获取成都天气
    this._getChengduWeather();
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
            <span className="city">{this.state.city}</span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </header>
    )
  }
  logout() {
    console.log('click logout')
  }
  _getChengduWeather = () => {
    getChengduWeather().then(res => {
      if (res.status === SUCCESS_STATUS && res.infocode === SUCCESS_CODE) {
        let { weather, city } = res.lives[0]
        this.setState({
          weather,
          city
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
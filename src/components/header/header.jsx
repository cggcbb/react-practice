import { Col, Row } from 'antd'
import { getChengduWeather } from 'api/weather'
import { optimizeCurrentTime } from 'common/js/utils'
import { SUCCESS_CODE, SUCCESS_STATUS } from 'common/js/config'
import { message } from 'antd'
import { connect } from 'react-redux'
import React from 'react'

import './header.less'

class Header extends React.Component {
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
    let { type } = this.props
    return (
      <header className="header">
        <Row className="header-user-info">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#" onClick={this.logout.bind(this)} className="logout">退出</a>
          </Col>
        </Row>
        {
          type
            ? '' 
            : <Row className="breadcrumb">
                <Col span={4} className="breadcrumb-title">
                  { this.props.menuName }
                </Col>
                <Col span={20} className="weather">
                  <span className="date">{this.state.sysTime}</span>
                  <span className="city">{this.state.city}</span>
                  <span className="weather-detail">{this.state.weather}</span>
                  <span className="temperature">{this.state.temperature}℃</span>
                </Col>
              </Row>
        }
      </header>
    )
  }
  logout() {
    message.info('退出')
  }
  _getChengduWeather = () => {
    getChengduWeather().then(res => {
      if (res.status === SUCCESS_STATUS && res.infocode === SUCCESS_CODE) {
        let { weather, city, temperature } = res.lives[0]
        this.setState({
          weather,
          city,
          temperature
        })
      }
    }).catch(err => {
      message.error(err.info)
    })
  }
}
const mapStateToProps = state => {
  
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)
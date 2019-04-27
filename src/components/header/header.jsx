import { Col, Row, Icon, Badge } from 'antd'
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
      sysTime: optimizeCurrentTime(),
      notifyCount: 1,
      offsetX: 0
    })
    this.timer = setInterval(() => {
      let { notifyCount } = this.state
      let curr = ++notifyCount
      let length = (curr + '').length
      let offsetX = length < 2 ? 0 : length === 2 ? 6 : 10
      this.setState({
        sysTime: optimizeCurrentTime(),
        offsetX,
        notifyCount: curr
      })
    }, 1000)
    // 获取成都天气
    this._getChengduWeather();
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    let { type } = this.props
    return (
      <header className="header">
        <Row className="header-user-info">
          <Col span={24}>
            <Badge className="badge-wrapper" count={this.state.notifyCount} overflowCount={99} offset={[this.state.offsetX, 2]}>
              <div className="notify-badge">
                <Icon type="bell" style={{fontSize: 20}}></Icon>
              </div>
            </Badge>
            <a href="#/login" className="avatar">
              <img src="/nav/avatar.jpg" width="40"/>
            </a>
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
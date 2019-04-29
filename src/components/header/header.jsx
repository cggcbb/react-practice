import { Col, Row, Icon, Badge, Popover, message, Breadcrumb } from 'antd'
import { getChengduWeather } from 'api/weather'
import { optimizeCurrentTime } from 'common/js/utils'
import { SUCCESS_CODE, SUCCESS_STATUS } from 'common/js/config'
import { connect } from 'react-redux'
import React from 'react'

import './header.less'

class Header extends React.Component {
  breadcrumbConfig = ['ui', 'form', 'table', 'charts']
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
  handleLogout = () => {
    window.location.hash = '#/login'
  }
  renderBreadcrumb = () => {
    return this.props.breadcrumb.map((item, index) => {
      return (
        <Breadcrumb.Item key={index} onClick={this.handleBeadcrumbClick}>
          {this.breadcrumbConfig.includes(item.key) || index === this.props.breadcrumb.length - 1 ? item.title : <a href={`#${item.key}`}>{item.title}</a>}
        </Breadcrumb.Item>
      )
    })
  }
  handleBeadcrumbClick = () => {
    this.props.handleBeadcrumbClick()
  }
  render() {
    const content = (
      <p className="logout-item" onClick={this.handleLogout}>
        <i className="logout-icon"/>
        退出登录
      </p>
    )
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
            <Popover placement="bottomRight" content={content} trigger="hover">
              <div className="avatar">
                <img alt="avatar" src="/nav/avatar.jpg" width="40"/>
              </div>
            </Popover>
          </Col>
        </Row>
        {
          type
            ? '' 
            : <Row className="breadcrumb">
                <Col span={6} className="breadcrumb-title">
                  <Breadcrumb separator=">">
                    {this.renderBreadcrumb()}
                  </Breadcrumb>
                </Col>
                <Col span={18} className="weather">
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
    breadcrumb: state.breadcrumb
  }
}
export default connect(mapStateToProps)(Header)
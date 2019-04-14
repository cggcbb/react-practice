import './detail.less'
import React from 'react'
import { Card, Button, Table, Select, Form, DatePicker, Tag, Badge, message, Modal } from 'antd'
import { ajax } from 'common/js/ajax'
import { AST_NameMapping } from 'terser';

export default class OrderDetail extends React.Component {
  state = {}
  componentWillMount() {
    let { orderNo } = this.props.match.params
    if (orderNo) {
      this._getOrderDetail(orderNo)
    }
  }
  _getOrderDetail = (orderNo) => {
    ajax({ url: `/order/detail`, param: {
      orderNo
    }}).then(res => {
      this.setState({
        detailInfo: res.result
      })
      this._renderMap()
    })
  }
  // 渲染地图总入口
  _renderMap = () => {
    this._initMap()
    this._drawBikeRoute()
    this._drawArea()
  }
  // 初始化地图
  _initMap = () => {
    let track = this.state.detailInfo.position_list
    this.map = new window.AMap.Map('orderDetailMap', {
      zoom: 14,
      center: [track[0].longitude, track[0].latitude] // 中心点坐标
    })
  }
  // 绘制行程路线
  _drawBikeRoute = () => {
    let track = this.state.detailInfo.position_list
    let lineArr = track.map(item => {
      return [item.longitude, item.latitude]
    })
    var polyline = new window.AMap.Polyline({
      path: lineArr,
      strokeColor: '#9019fd',
      strokeWeight: 3,
      strokeStyle: 'solid'
    })
    this.map.add(polyline)
  }
  // 绘制区域
  _drawArea = () => {
    let area = this.state.detailInfo.area_list
    let polygonArea = area.map(item => {
      return [item.longitude, item.latitude]
    })
    let polygon = new window.AMap.Polygon({
        path: polygonArea,
        strokeColor: "#ce0000", 
        strokeWeight: 3,
        strokeOpacity: 0.2,
        fillOpacity: 0.2,
        fillColor: '#ff8605',
        zIndex: 50,
    })
    this.map.add(polygon)
    // 缩放地图到合适的视野级别
    this.map.setFitView([ polygon ])
  }
  render() {
    const { detailInfo = {} } = this.state
    return (
      <section>
        <Card className="card-wrapper second-card" hoverable>
          <section id="orderDetailMap"></section>
          <section className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车类型</div>
                <div className="detail-form-content">{detailInfo.type === 1 ? '包月' : '计次'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{detailInfo.order_no}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{detailInfo.bike_no}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{detailInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{detailInfo.telephone}</div>
              </li>
            </ul>
          </section>
          <section className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">{detailInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶终点</div>
                <div className="detail-form-content">{detailInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{`${(detailInfo.distance / 1000).toFixed(1)}公里`}</div>
              </li>
            </ul>
          </section>
        </Card>
      </section>
    )
  }
}
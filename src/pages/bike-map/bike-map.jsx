import React from 'react'
import { Card } from 'antd'
import { ajax } from 'common/js/ajax'

export default class OrderDetail extends React.Component {
  state = {}
  componentWillMount() {
    this._getBikeMap()
  }
  _getBikeMap = () => {
    ajax({ url: `/bikeMap` }).then(res => {
      this.setState({
        bikeMap: res.result
      })
      this._renderMap()
    })
  }
  // 渲染地图总入口
  _renderMap = () => {
    this._initMap()
    this._drawBikeRoute()
    this._drawArea()
    this._drawStartEndIcon()
    this._drawBikeIcon()
  }
  // 初始化地图
  _initMap = () => {
    let track = this.state.bikeMap.position_list
    this.map = new window.AMap.Map('bikeMap', {
      center: [track[0].longitude, track[0].latitude] // 中心点坐标
    })
  }
  // 绘制行程路线
  _drawBikeRoute = () => {
    let track = this.state.bikeMap.position_list
    let lineArr = track.map(item => {
      return [item.longitude, item.latitude]
    })
    let polyline = new window.AMap.Polyline({
      path: lineArr,
      strokeColor: '#9019fd',
      strokeWeight: 3,
      strokeStyle: 'solid'
    })
    this.map.add(polyline)
  }
  // 绘制区域
  _drawArea = () => {
    let area = this.state.bikeMap.area_list
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
  // 绘制 起点 终点 图标
  _drawStartEndIcon = () => {
    let track = this.state.bikeMap.position_list
    // 创建start icon
    let startIcon = new window.AMap.Icon({
        size: new window.AMap.Size(25, 34), // // 图标尺寸
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png', // 图标的取图地址
        imageSize: new window.AMap.Size(135, 40), // 图标所用图片大小
        imageOffset: new window.AMap.Pixel(-9, -3) // 图标取图偏移量
    })
    // 将 icon 传入 marker
    let startMarker = new window.AMap.Marker({
        position: new window.AMap.LngLat(track[0].longitude, track[0].latitude),
        icon: startIcon,
        offset: new window.AMap.Pixel(-13, -30)
    })
    // 创建end icon
    let endIcon = new window.AMap.Icon({
        size: new window.AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new window.AMap.Size(135, 40),
        imageOffset: new window.AMap.Pixel(-95, -3)
    })
    // 将 icon 传入 marker
    let endMarker = new window.AMap.Marker({
        position: new window.AMap.LngLat(track[track.length - 1].longitude, track[track.length - 1].latitude),
        icon: endIcon,
        offset: new window.AMap.Pixel(-13, -30)
    })
    // 将 markers 添加到地图
    this.map.add([startMarker, endMarker])
  }
  // 绘制bike图标
  _drawBikeIcon = () => {
    let bikeList = this.state.bikeMap.bike_list
    // 创建Bike icon
    let bikeIcon = new window.AMap.Icon({
      size: new window.AMap.Size(40, 40), // // 图标尺寸
      image: '/bike-map/bike.png', // 图标的取图地址
      imageSize: new window.AMap.Size(40, 40), // 图标所用图片大小
    })
    bikeList.forEach(item => {
      // 将 icon 传入 marker
      let bikeMarker = new window.AMap.Marker({
        position: new window.AMap.LngLat(item.longitude, item.latitude),
        icon: bikeIcon,
      })
      // 将 markers 添加到地图
      this.map.add([bikeMarker])
    })
  }
  render() {
    return (
      <section>
        <Card title="车辆地图" className="card-wrapper second-card" hoverable>
          <section id="bikeMap" style={{height: 760}}></section>
        </Card>
      </section>
    )
  }
}
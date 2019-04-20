import React from 'react'
import FilterForm from 'components/filter-form/filter-form'
import { Card, Button, Table, Tag, Badge, message, Modal } from 'antd'
import { ajax } from 'common/js/ajax'

export default class Order extends React.Component {
  state = {}
  statusConfig = {
    1: { name: '进行中', color: '#9300c3'},
    2: { name: '行程结束', color: '#137d43'}
  }
  typeConfig = {
    1: <Badge status="success" text="包月"/>,
    2: <Badge status="warning" text="计次"/>
  }
  columns = [
    { title: '订单编号', dataIndex: 'order_no', width: 180, align: 'center' },
    { title: '车辆编号', dataIndex: 'bike_no', width: 180, align: 'center' },
    { title: '用户名', dataIndex: 'user_name', width: 100, align: 'center' },
    { title: '手机号码', dataIndex: 'telephone', width: 180, align: 'center' },
    { title: "里程", dataIndex: "distance", width: 180, align: 'center',
      render: (distance) => {
        return `${(distance / 1000).toFixed(1)}公里`
      }
    },
    { title: '行驶时长', dataIndex: 'use_time', width: 180, align: 'center',
      render: (use_time) => {
        return `${use_time}分钟`
      }
    },
    { title: '状态', dataIndex: 'status', width: 180, align: 'center', 
      render: (status) => {
        return <Tag color={this.statusConfig[status].color}>{this.statusConfig[status].name}</Tag>
      }
    },
    { title: '开始时间', dataIndex: 'start_time', width: 200, align: 'center' },
    { title: '结束时间', dataIndex: 'end_time', width: 200, align: 'center' },
    { title: '类型', dataIndex: 'type', width: 100, align: 'center', 
      render: (type) => {
        return this.typeConfig[type]
      }
    },
    { title: '订单金额', dataIndex: 'total_fee', width: 120, align: 'center' },
    { title: '优惠券', dataIndex: 'coupon', width: 120, align: 'center' },
    { title: '实付金额', dataIndex: 'user_pay', width: 120, align: 'center' }
  ]
  componentWillMount() {
    this._getOrderList()
  }
  // 获取order列表
  _getOrderList(params = null) {
    ajax({ url: '/order/list', params }).then(res => {
      this.setState({
        dataSource: res.result
      })
    })
  }
  // 订单详情
  openOrderDetail = () => {
    let orderInfo = this.state.selectedItem
    if (!orderInfo) {
      Modal.warn({
        title: '信息',
        content: '请选择一条订单进行查看 ~~~'
      })
      return
    }
    // 开启新页面
    window.open(`/#/common/order/detail/${orderInfo.order_no}`, '_blank')
  }
  // 结束订单
  endOrder = () => {
    let orderInfo = this.state.selectedItem
    if (!orderInfo) {
      Modal.warn({
        title: '信息',
        content: '请选择一条订单进行结束 ~~~'
      })
      return
    }
    Modal.confirm({
      title: '信息',
      content: `确认结束订单编号【${orderInfo.order_no}】的订单？`,
      onOk: () => {
        message.success('结束订单成功！')
        this._getOrderList()
        this._clearSelected()
      }
    })
  }
  // 点击表格每行
  handleOnRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedItem: record
    })
  }
  // 搜索栏 查询按钮点击事件
  handleFilterSubmit = (params) => {
    this.params = params
    this._getOrderList(params)
    this._clearSelected()
  }
  // 重置 selectedRowKeys 和 selectedItem
  _clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
      selectedItem: null
    })
  }
  // 搜索表单配置
  filterConfig = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      style: { width: 120, marginRight: 30 },
      initialValue: '1',
      placeholder: '全部',
      list: [
        { value: ' ', name: '全部' },
        { value: '1', name: '北京' },
        { value: '2', name: '上海' },
        { value: '3', name: '广州' },
        { value: '4', name: '深圳' },
        { value: '5', name: '杭州' },
        { value: '6', name: '成都' }
      ]
    },
    {
      type: 'DATEPICKER', // 日期时间控件
      format: 'YYYY-MM-DD',
      style: { marginRight: 30 },
      placeholder: ['选择开始时间', '选择结束时间'],
      field: ['begin_time', 'end_time']
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      style: { width: 120, marginRight: 30 },
      initialValue: '1',
      placeholder: '全部',
      list: [
        { value: ' ', name: '全部' },
        { value: '1', name: '进行中' },
        { value: '2', name: '行程结束' }
      ]
    },
    {
      type: 'SELECT',
      label: '类型',
      field: 'type',
      style: { width: 120, marginRight: 30 },
      initialValue: '1',
      placeholder: '全部',
      list: [
        { value: ' ', name: '全部' },
        { value: '1', name: '包月' },
        { value: '2', name: '计次' }
      ]
    }
  ]
  render() {
    // 单选rowSelection
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <section>
        <Card className="card-wrapper" hoverable size="middle">
          <FilterForm formConfig={this.filterConfig} filterSubmit={this.handleFilterSubmit}/>
        </Card>
        <Card className="card-wrapper open-city-wrapper">
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" onClick={this.endOrder}>结束订单</Button>
        </Card>
        <div className="content-wrapper">
          <Table
            bordered
            size="middle"
            rowKey={result => result.id - 1}
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{
              simple: true
            }}
            rowSelection={rowSelection}
            onRow={(result, index) => {
              return {
                // 点击行
                onClick: () => {
                  this.handleOnRowClick(result, index)  
                }
              }
            }}
          />
        </div>
      </section>
    )
  }
}
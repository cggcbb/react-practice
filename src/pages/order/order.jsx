import React from 'react'
import { Card, Button, Table, Select, Form, DatePicker, Tag, Badge, message, Modal } from 'antd'
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
  // 获取city列表
  _getOrderList() {
    ajax({ url: '/order/list' }).then(res => {
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
    window.open(`/#/common/order/detail/${orderInfo.order_no}`, '_blank')
  }
  // 结束订单
  endOrder = () => {

  }
  handleOnRowClick = (record, index) => {
    let selectedRowKeys = [index]
    console.log(selectedRowKeys)
    this.setState({
      selectedRowKeys,
      selectedItem: record
    }, () => {
      const { order_no, bike_no, user_name, telephone, user_pay } = this.state.selectedItem
      message.success(`订单编号：${order_no} ─> 车辆编号：${bike_no} ─> 姓名：${user_name} ─> 电话：${telephone} ─> 实付金额：${user_pay}`)
    })
  }
  render() {
    // 单选rowSelection
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <section>
        <Card className="card-wrapper"hoverable size="middle">
          <FilterForm/>
        </Card>
        <Card className="card-wrapper open-city-wrapper" hoverable size="small">
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
class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <section>
        <Form layout="inline">
          <Form.Item label="城市">
            {
              getFieldDecorator('city_id')(
                <Select style={{width: 120, marginRight: 30}} placeholder="全部">
                  <Select.Option value=" ">全部</Select.Option>
                  <Select.Option value="1">北京</Select.Option>
                  <Select.Option value="2">上海</Select.Option>
                  <Select.Option value="3">广州</Select.Option>
                  <Select.Option value="4">深圳</Select.Option>
                  <Select.Option value="5">杭州</Select.Option>
                  <Select.Option value="6">成都</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('start_time')(
                <DatePicker placeholder="选择开始时间"></DatePicker>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('end_time')(
                <DatePicker placeholder="选择结束时间"></DatePicker>
              )
            }
          </Form.Item>
          <Form.Item label="订单状态">
            {
              getFieldDecorator('order_status')(
                <Select style={{width: 120}} placeholder="全部">
                  <Select.Option value=" ">全部</Select.Option>
                  <Select.Option value="1">进行中</Select.Option>
                  <Select.Option value="2">行程结束</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="类型">
            {
              getFieldDecorator('type')(
                <Select style={{width: 120, marginRight: 30}} placeholder="全部">
                  <Select.Option value=" ">全部</Select.Option>
                  <Select.Option value="1">包月</Select.Option>
                  <Select.Option value="2">计次</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
          </Form.Item>
        </Form>
      </section>
    )
  }
}
FilterForm = Form.create({ name: 'FilterForm' })(FilterForm)
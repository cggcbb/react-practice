import './city.less'
import React from 'react'
import { Card, Button, Form, Select, Table, Modal, Radio, notification, Tag, Badge } from 'antd'
import { ajax } from 'common/js/ajax'
import { optimizeCurrentTime } from 'common/js/utils'
export default class City extends React.Component {
  // city字典
  cityConfig = {
    '1': '北京',
    '2': '上海',
    '3': '广州',
    '4': '深圳',
    '5': '杭州',
    '6': '成都'
  }
  // 用车模式字典
  useModeConfig = {
    '1': { name: '禁停区', color: '#b5003e', badgeStatus: 'error' },
    '2': { name: '停车点', color: '#2db7f5', badgeStatus: 'success' }
  }
  // 运营模式字典
  operateModeConfig = {
    '1': { name: '自营', color: '#108ee9' },
    '2': { name: '加盟', color: '#87d068' }
  }
  state = {
    isShowOpenModal: false
  }  
  componentWillMount() {
    this._getCity()
  }
  // 获取city列表
  _getCity() {
    ajax({ url: '/city/list' }).then(res => {
      this.setState({
        dataSource: res.result
      })
    })
  }
  // 开通城市弹窗
  handleOpenCity = () => {
    this.setState({
      isShowOpenModal: true
    })
  }
  // 取消开通城市弹窗
  handleCancel = () => {
    this.setState({
      isShowOpenModal: false
    })
  }
  // 确认开通城市
  handleSubmit = () => {
    let { city_id, use_mode, operate_mode } = this.openCityForm.props.form.getFieldsValue()
    notification.success({
      message: '开通城市成功',
      description: `开通城市【${this.cityConfig[city_id]}】，用车模式【${this.useModeConfig[use_mode].name}】，用车模式【${this.operateModeConfig[operate_mode].name}】`,
      style: {
        width: 500,
        marginLeft: -130,
        marginTop: 100
      },
    })
    this.setState({
      isShowOpenModal: false
    })
    this._getCity()
  }
  // 表头渲染
  columns = [
    { title: 'ID', dataIndex: 'id', width: 80, align: 'center' },
    { title: '城市名称', dataIndex: 'city_name', width: 180, align: 'center' },
    { title: '用车模式', dataIndex: 'use_mode', width: 100, align: 'center',
      render: (use_mode) => {
        return <Badge status={this.useModeConfig[use_mode].badgeStatus} text={<Tag color={this.useModeConfig[use_mode].color}>{this.useModeConfig[use_mode].name}</Tag>}></Badge>
      }
    },
    { title: '运营模式', dataIndex: 'operate_mode', width: 100, align: 'center',
      render: (operate_mode) => {
        return <Tag color={this.operateModeConfig[operate_mode].color}>{this.operateModeConfig[operate_mode].name}</Tag>
      }
    },
    { title: '加盟商', dataIndex: 'franchisee', width: 200, align: 'center' },
    { title: "城市管理员", dataIndex: "city_manager", width: 200, align: 'center',
      render: (city_manager) => {
        return city_manager.map(item => item.user_name).join(', ')
      }
    },
    { title: '城市开通时间', dataIndex: 'open_time', width: 200, align: 'center' },
    { title: '上次更新时间', dataIndex: 'last_update_time', width: 200, align: 'center',
      render: optimizeCurrentTime
    },
    { title: '操作员', dataIndex: 'operation_person', width: 200, align: 'center' }
  ]
  render() {
    return (
      <section>
        <Card className="card-wrapper" hoverable size="middle">
          <FilterForm/>
        </Card>
        <Card className="card-wrapper open-city-wrapper" hoverable size="small">
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
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
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenModal}
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={openCityForm => { this.openCityForm = openCityForm }}/>
        </Modal>
      </section>
    )
  }
}
// 搜索form
class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
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
        <Form.Item label="运营模式">
          {
            getFieldDecorator('operate_mode')(
              <Select style={{width: 120, marginRight: 30}} placeholder="全部">
                <Select.Option value=" ">全部</Select.Option>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式">
          {
            getFieldDecorator('use_mode')(
              <Select style={{width: 120, marginRight: 30}} placeholder="全部">
                <Select.Option value=" ">全部</Select.Option>
                <Select.Option value="1">禁停区</Select.Option>
                <Select.Option value="2">停车点</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="授权状态">
          {
            getFieldDecorator('auth_state')(
              <Select style={{width: 120, marginRight: 30}} placeholder="全部">
                <Select.Option value=" ">全部</Select.Option>
                <Select.Option value="1">已授权</Select.Option>
                <Select.Option value="2">未授权</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
FilterForm = Form.create({ name: 'FilterForm' })(FilterForm)

// 开通城市Modal
class OpenCityForm extends React.Component {
  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 7
      }
    }
    const radioLayout = {
      wrapperCol: {
        span: 16
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="horizontal" {...layout}>
        <Form.Item label="选择城市">
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select>
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
        <Form.Item label="运营模式">
          {
            getFieldDecorator('operate_mode', {
              initialValue: '1'
            })(
              <Select>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...radioLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Radio.Group>
                <Radio value="1">禁停区</Radio>
                <Radio value="2">停车点</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
OpenCityForm = Form.create({ name: 'OpenCityForm' })(OpenCityForm)
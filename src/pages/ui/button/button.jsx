import { Card, Button, Icon, Radio } from 'antd'
import React from 'react'

import './button.less'

export default class Buttons extends React.Component {
  componentWillMount() {
    this.setState({
      loading: true,
      size: 'default'
    })
  }
  handleCloseLoading() {
    this.setState({
      loading: false
    })
  }
  handleOpenLoading() {
    this.setState({
      loading: true
    })
  }
  handleChange(e) {
    this.setState({
      size: e.target.value
    })
  }
  render() {
    return (
      <section>
        <Card title="基础按钮" className="card-wrapper" hoverable size="small">
          <Button type="primary">primary</Button>
          <Button>default</Button>
          <Button type="dashed">dashed</Button>
          <Button type="danger">danger</Button>
          <Button disabled>disabled</Button>
        </Card>
        <Card title="图形按钮" className="card-wrapper" hoverable size="small">
          <Button icon="plus">plus</Button>
          <Button icon="edit">edit</Button>
          <Button icon="delete">delete</Button>
          <Button icon="search" shape="circle"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card-wrapper" hoverable size="small">
          <Button type="primary" loading={this.state.loading}>Loading</Button>
          <Button icon="primary" shape="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>Loading</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.handleCloseLoading.bind(this)}>关闭 Loading</Button>
          <Button type="primary" onClick={this.handleOpenLoading.bind(this)}>开启 Loading</Button>
        </Card>
        <Card title="block按钮" className="card-block-wrapper" hoverable size="small">
          <Button type="primary" block>primary</Button>
          <Button block>default</Button>
          <Button type="dashed" block>dashed</Button>
          <Button type="danger" block>danger</Button>
        </Card>
        <Card title="按钮组" className="card-wrapper" hoverable size="small">
          <Button.Group>
            <Button type="primary">
              <Icon type="left" />Go back
            </Button>
            <Button type="primary">
              Go forward<Icon type="right" />
            </Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card-wrapper" hoverable size="small">
          <Radio.Group value={this.state.size} onChange={this.handleChange.bind(this)}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>确定</Button>
          <Button size={this.state.size}>确定</Button>
          <Button type="dashed" size={this.state.size}>确定</Button>
          <Button type="danger" size={this.state.size}>确定</Button>
        </Card>
      </section>
    )
  }
}
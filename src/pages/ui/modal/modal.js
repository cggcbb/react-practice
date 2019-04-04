import { Card, Button, Modal, message } from 'antd'
import React from 'react'

import './modal.less'

export default class Modals extends React.Component {
  componentWillMount() {
    this.setState({
      loading: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showModal5: false,
      showModal6: false,
      showModal7: false
    })
  }
  handleClick(type) {
    this.setState({
      [type]: true
    })
  }
  handleCancel(type, message) {
    this.setState({
      [type]: false
    })
    message.warn(message)
  }
  handleOk(type, message) {
    this.setState({
      [type]: false
    })
    message.success(message)
  }
  handleLoadingOk(message) {
    this.setState({ loading: true })
    message.success(message)
    setTimeout(() => {
      this.setState({ loading: false, 'showModal6': false })
    }, 3000)
  }
  info = () => {
    Modal.info({
      title: 'This is a notification message',
      content: 'some messages...some messages...'
    });
  }
  success = () => {
    Modal.success({
      title: 'This is a success message',
      content: 'some messages...some messages...'
    })
  }
  error = () => {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...'
    })
  }
  warning = () => {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...'
    })
  }
  render() {
    return (
      <div>
        <Card title="默认模态框" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal1')}>默认</Button>
          <Button onClick={() => this.handleClick('showModal1')}>默认</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal1')}>默认</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal1')}>默认</Button>
        </Card>
        <Card title="自定义页脚模态框" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal2')}>自定义页脚</Button>
          <Button onClick={() => this.handleClick('showModal2')}>自定义页脚</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal2')}>自定义页脚</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal2')}>自定义页脚</Button>
        </Card>
        <Card title="顶部水平居中弹框" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal3')}>顶部水平居中</Button>
          <Button onClick={() => this.handleClick('showModal3')}>顶部水平居中</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal3')}>顶部水平居中</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal3')}>顶部水平居中</Button>
        </Card>
        <Card title="水平垂直居中" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal4')}>水平垂直居中</Button>
          <Button onClick={() => this.handleClick('showModal4')}>水平垂直居中</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal4')}>水平垂直居中</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title="禁用取消按钮" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal5')}>禁用取消</Button>
          <Button onClick={() => this.handleClick('showModal5')}>禁用取消</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal5')}>禁用取消</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal5')}>禁用取消</Button>
        </Card>
        <Card title="提交异步关闭按钮" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('showModal6')}>提交异步关闭</Button>
          <Button onClick={() => this.handleClick('showModal6')}>提交异步关闭</Button>
          <Button type="dashed" onClick={() => this.handleClick('showModal6')}>提交异步关闭</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal6')}>提交异步关闭</Button>
        </Card>
        <Card title="只提供一个按钮用于关闭" className="card-wrapper">
          <Button type="primary" onClick={this.info}>Info</Button>
          <Button onClick={this.success}>Success</Button>
          <Button onClick={this.warning}>Warning</Button>
          <Button type="danger" onClick={this.error}>Error</Button>
        </Card>
        <Modal 
          title="React" 
          visible={this.state.showModal1}
          onCancel={() => this.handleCancel('showModal1', '点击了 默认 modal 取消按钮')}
          onOk={() => this.handleOk('showModal1', '点击了 默认 modal 确定按钮')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal2}
          onCancel={() => this.handleCancel('showModal2', '点击了 自定义页脚 modal 取消按钮')}
          okText="确定"
          cancelText="取消"
          onOk={() => this.handleOk('showModal2', '点击了 自定义页脚 modal 确定按钮')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal3}
          onCancel={() => this.handleCancel('showModal3', '点击了 顶部水平居中弹框 modal 取消按钮')}
          style={{top: 0}}
          onOk={() => this.handleOk('showModal3', '点击了 顶部水平居中弹框 modal 确定按钮')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal4}
          onCancel={() => this.handleCancel('showModal4', '点击了 水平垂直居中 modal 取消按钮')}
          centered
          onOk={() => this.handleOk('showModal4', '点击了 水平垂直居中 modal 确定按钮')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal5}
          onOk={() => this.handleOk('showModal5', '点击了 禁用取消按钮 modal 确定按钮')}
          cancelButtonProps={{ disabled: true }}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
            title="React" 
            visible={this.state.showModal6}
            footer={[
              <Button key="back" onClick={() => this.handleCancel('showModal6', '点击了 提交异步关闭 modal 取消按钮')}>取消</Button>,
              <Button key="submit" type="primary" loading={this.state.loading} onClick={() => this.handleLoadingOk('点击了 提交异步关闭 modal 提交按钮, 提交申请中 ~~~~~')}>
                提交
              </Button>,
            ]}
          >
            <p>这是 React modal ~~</p>
          </Modal>
      </div>
    )
  }
}
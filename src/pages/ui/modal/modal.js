import { Card, Button, Modal } from 'antd'
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
      showModal7: false,
      showModal8: false
    })
  }
  handleClick(type) {
    this.setState({
      [type]: true
    })
  }
  handleCancel(type) {
    this.setState({
      [type]: false
    })
  }
  handleOk(type) {
    this.setState({
      [type]: false
    })
  }
  handleLoadingOk() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, 'showModal8': false })
    }, 3000)
  }
  handleConfirm = (type) => {
    Modal[type]({
      title: 'This is a notification message',
      content: 'some messages...some messages...',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancel')
      }
    });
  }
  countDown = () => {
    let secondsToGo = 5
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`
      });
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      modal.destroy()
    }, secondsToGo * 1000)
  }
  render() {
    return (
      <div>
        <Card title="基础模态框" className="card-wrapper" hoverable={true} size="small">
          <Button type="primary" onClick={() => this.handleClick('showModal1')}>默认</Button>
          <Button type="primary" onClick={() => this.handleClick('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={() => this.handleClick('showModal3')}>顶部水平居中</Button>
          <Button type="primary" onClick={() => this.handleClick('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title="禁用按钮" className="card-wrapper" hoverable={true} size="small">
          <Button type="danger" onClick={() => this.handleClick('showModal5')}>禁用取消按钮</Button>
          <Button type="danger" onClick={() => this.handleClick('showModal6')}>禁用确定按钮</Button>
        </Card>
        <Card title="延时自动关闭" className="card-wrapper" hoverable={true} size="small">
          <Button type="primary" onClick={() => this.countDown('showModal7')}>延时自动关闭</Button>
        </Card>
        <Card title="提交异步关闭按钮" className="card-wrapper" hoverable={true} size="small">
          <Button type="primary" onClick={() => this.handleClick('showModal8')}>提交异步关闭</Button>
        </Card>
        <Card title="只提供一个按钮用于关闭" className="card-wrapper" hoverable={true} size="small">
          <Button onClick={() => this.handleConfirm('confirm')}>confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
          <Button onClick={() => this.handleConfirm('success')}>Success</Button>
          <Button onClick={() => this.handleConfirm('warning')}>Warning</Button>
          <Button type="danger" onClick={() => this.handleConfirm('error')}>Error</Button>
        </Card>
        <Modal 
          title="React" 
          visible={this.state.showModal1}
          onCancel={() => this.handleCancel('showModal1')}
          onOk={() => this.handleOk('showModal1')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal2}
          onCancel={() => this.handleCancel('showModal2')}
          okText="确定"
          cancelText="取消"
          onOk={() => this.handleOk('showModal2')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal3}
          onCancel={() => this.handleCancel('showModal3')}
          style={{top: 0}}
          onOk={() => this.handleOk('showModal3')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal4}
          onCancel={() => this.handleCancel('showModal4')}
          centered
          onOk={() => this.handleOk('showModal4')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal5}
          onOk={() => this.handleOk('showModal5')}
          cancelButtonProps={{ disabled: true }}
          closable={false}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal6}
          onCancel={() => this.handleOk('showModal6')}
          okButtonProps={{ disabled: true }}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
          title="React" 
          visible={this.state.showModal7}
          onCancel={() => this.handleOk('showModal7')}
        >
          <p>这是 React modal ~~</p>
        </Modal>
        <Modal 
            title="React" 
            visible={this.state.showModal8}
            onCancel={() => this.handleCancel('showModal8')}
            footer={[
              <Button key="back" onClick={() => this.handleCancel('showModal8')}>取消</Button>,
              <Button key="submit" type="primary" loading={this.state.loading} onClick={() => this.handleLoadingOk()}>
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
import React from 'react'
import { Card, Button, message } from 'antd'

export default class messages extends React.Component {

  openMessage = (type) => {
    message[type]('There is something to messaged ~~~')
  }
  render() {
    return (
      <section>
        <Card title="提示框" className="card-wrapper" hoverable={true} size="small">
          <Button icon="check" type="primary" onClick={() => this.openMessage('success')}>Success</Button>
          <Button icon="info-circle" type="dashed" onClick={() => this.openMessage('info')}>Info</Button>
          <Button icon="warning" onClick={() => this.openMessage('warning')}>Warning</Button>
          <Button icon="close" type="danger" onClick={() => this.openMessage('error')}>Error</Button>
          <Button icon="loading-3-quarters" onClick={() => this.openMessage('loading')}>Loading</Button>
        </Card>
      </section>
    )
  }
}
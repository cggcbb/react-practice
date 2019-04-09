import React from 'react'
import { Card, Button, notification } from 'antd';

export default class Notice extends React.Component {
  openNotificationWithIcon = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. ',
    });
  };
  render() {
    return (
      <section>
        <Card title="通知提示框" className="card-wrapper" hoverable size="small">
          <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
          <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
          <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
          <Button type="danger" onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
        </Card>
        <Card title="设置通知位置" className="card-wrapper" hoverable size="small">
          <Button onClick={() => this.openNotificationWithIcon('success', 'topLeft')}>左上角</Button>
          <Button onClick={() => this.openNotificationWithIcon('info', 'topRight')}>右上角</Button>
          <Button onClick={() => this.openNotificationWithIcon('warning', 'bottomLeft')}>左下角</Button>
          <Button type="danger" onClick={() => this.openNotificationWithIcon('error', 'bottomRight')}>右下角</Button>
        </Card>
      </section>
    )
  }
}
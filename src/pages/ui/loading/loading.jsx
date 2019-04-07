import { Card, Spin, Icon, Alert } from 'antd'
import React from 'react'

import './loading.less'

export default class Loading extends React.Component {
  render() {
    return (
      <section>
        <Card title="Spin的用法"  className="card-wrapper" hoverable size="small">
          <Spin size="small" className="spin"/>
          <Spin className="spin"/>
          <Spin size="large" className="spin"/>
          <Spin size="large" className="spin" indicator={<Icon type="loading"></Icon>}/>
          <Spin size="large" className="spin" indicator={<Icon type="sync"></Icon>}/>
        </Card>
        <Card title="内容遮罩"  className="card-wrapper" hoverable size="small">
          <Alert
              className="alert-item"
              message="title"
              description="this is description message ~~"
              type="success"
              closable
              showIcon
            />
          <Alert
            className="alert-item"
            message="title"
            description="this is description message ~~"
            type="info"
            closable
            showIcon
          />
          <Alert
            className="alert-item"
            message="title"
            description="this is description message ~~"
            type="warning"
            closable
            showIcon
          />
           <Alert
            className="alert-item"
            message="title"
            description="this is description message ~~"
            type="error"
            closable
            showIcon
          />
          <Spin>
            <Alert
              className="alert-item"
              message="title"
              description="this is description message ~~"
              type="info"
              closable
              showIcon
            />
          </Spin>
          <Spin indicator={<Icon type="loading"></Icon>}>
            <Alert
              className="alert-item"
              message="title"
              description="this is description message ~~"
              type="warning"
              closable
              showIcon
            />
          </Spin>
          <Spin indicator={<Icon type="loading"></Icon>} tip="Loading ~~~">
            <Alert
              className="alert-item"
              message="title"
              description="this is description message ~~"
              type="success"
              closable
              showIcon
            />
          </Spin>
        </Card>
      </section>
    )
  }
}
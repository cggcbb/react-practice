import React from 'react'
import { Row, Col, Card } from 'antd'
import './home.less'


export default class Home extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <Row
          gutter={16}
        >
          <Col span={9}>
            <Row
              style={{marginBottom: 10}}
              gutter={10}
            >
              <Col span={12}>
                <Card 
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img src="/home/love.png" width="44"></img>
                    </Col>
                    <Col span={19}>
                      <span>收藏</span>
                      <br/>
                      <span className="description">5000</span>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card 
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img src="/home/phone.png" width="44"></img>
                    </Col>
                    <Col span={19}>
                      <span>照片</span>
                      <br/>
                      <span className="description">802</span>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row 
              gutter={10}
            >
              <Col span={12}>
                <Card 
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img src="/home/cloud.png" width="44"></img>
                    </Col>
                    <Col span={19}>
                      <span>云数据</span>
                      <br/>
                      <span className="description">12081</span>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card 
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img src="/home/email.png" width="44"></img>
                    </Col>
                    <Col span={19}>
                      <span>邮件</span>
                      <br/>
                      <span className="description">92</span>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={15}><Card hoverable style={{height: 230}}>col-6</Card></Col>
        </Row>
      </div>
    )
  }
}
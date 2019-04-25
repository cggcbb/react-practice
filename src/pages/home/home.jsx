import './home.less'
import React from 'react'
import { Row, Col, Card, Timeline, Progress} from 'antd'
import echarts from 'echarts'
import { ajax } from 'common/js/ajax'
import colorTheme from 'config/colorTheme'
import ReactEcharts from 'echarts-for-react'

export default class Home extends React.Component {
  componentWillMount() {
    echarts.registerTheme('vintage', {
      color: colorTheme,
      backgroundColor: '#fff',
      graph: {
        color: colorTheme
      }
    })
  }
  render() {
    let xAxisData = []
    let data = []
    for (var i = 0; i < 100; i++) {
      xAxisData.push(`前${i + 1}天`)
      data.push(Math.floor(Math.random() * 5000))
    }
    let option = {
      title: {
        text: '最近100天订单量',
        top: 10,
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
            show: false
        }
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#49dcfd'},
                  {offset: 1, color: '#0c71ce'}
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#bf89e8'},
                  {offset: 1, color: '#512a8e'}
                ]
              )
            }
          },
          data,
          animationDelay: (idx) => {
            return idx * 10 + 100
          }
        }
      ],
      yAxis: {},
      animationEasing: 'elasticInOut',
      animationDelayUpdate: function (idx) {
        return idx * 20
      }
    }
    return (
      <div className="home-wrapper">
        <Row
          gutter={16}
        >
          <Col span={9}>
            <Row
              gutter={10}
            >
              <Col span={12}>
                <Card
                  className="card-wrapper"
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img alt="love" src="/home/love.png" width="44"></img>
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
                  className="card-wrapper"
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img alt="phone" src="/home/phone.png" width="44"></img>
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
                  className="card-wrapper"
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img alt="cloud" src="/home/cloud.png" width="44"></img>
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
                  className="card-wrapper"
                  hoverable
                  style={{padding: 10}}
                >
                  <Row
                    align="middle"
                    type="flex"
                    gutter={20}
                  >
                    <Col span={5}>
                      <img alt="email" src="/home/email.png" width="44"></img>
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
          <Col span={15}>
            <ReactEcharts style={{height: 238}} option={option} theme="vintage"/>
          </Col>
        </Row>
        <Row
          gutter={16}
        >
          <Col span={9}>
            <Card className="card-wrapper">
              <Timeline>
                <Timeline.Item color="#b5003e">What must have happened at that time</Timeline.Item>
                <Timeline.Item color="green">What must have happened at that time</Timeline.Item>
                <Timeline.Item color="red">
                  <p>What problems must have been encountered at that time</p>
                  <p>What problems must have been encountered at that time</p>
                  <p>What problems must have been encountered at that time</p>
                </Timeline.Item>
                <Timeline.Item color="#288594">
                  <p>There must be some regret at that time</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>What must be going on at this time</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col span={15}>
            <Row
              gutter={16}
            >
              <Col span={12}>
                <Card className="card-wrapper">
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>css css3</span>
                  <Progress
                    strokeColor={{
                      from: '#108ee9',
                      to: '#87d068',
                    }}
                    showInfo={false}
                    percent={75}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>html html5</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={70}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>javascript es6+</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={85}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>vue</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={80}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>react</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={70}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>webpack</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={75}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>node.js</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={65}
                    status="active"
                  />
                  <span style={{fontSize: 15, fontWeight: 'bold'}}>less stylus</span>
                  <Progress
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                    percent={70}
                    status="active"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="card-wrapper">
                  <Timeline reverse>
                    <Timeline.Item color="#b5003e">What must have happened at that time</Timeline.Item>
                    <Timeline.Item color="green">What must have happened at that time</Timeline.Item>
                    <Timeline.Item color="red">
                      <p>What problems must have been encountered at that time</p>
                      <p>What problems must have been encountered at that time</p>
                      <p>What problems must have been encountered at that time</p>
                    </Timeline.Item>
                    <Timeline.Item color="#288594">
                      <p>There must be some regret at that time</p>
                    </Timeline.Item>
                    <Timeline.Item>
                      <p>What must be going on at this time</p>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
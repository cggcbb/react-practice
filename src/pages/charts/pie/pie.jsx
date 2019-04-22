import '../echarts.less'
import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import { ajax } from 'common/js/ajax'
import colorTheme from '../colorTheme'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends React.Component {
  state = {
    legend: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: []
  }
  componentWillMount() {
    echarts.registerTheme('vintage', {
      color: colorTheme,
      backgroundColor: '#fef8ef',
      graph: {
        color: colorTheme
      }
    })
    this._getPieData()
  }
 
  _getPieData = () => {
    ajax({ url: '/echarts/pie' }).then(res => {
      this.setState({
        data: res.result
      })
    })
  }
  getOptionOne = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: '100px',
        top: '20px',
        data: this.state.legend
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: this.state.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  getOptionTwo = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: '100px',
        top: '20px',
        data: this.state.legend
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: this.state.data,
          radius: ['55%', '80%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    }
  }
  getOptionThree = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: '100px',
        top: '20px',
        data: this.state.legend
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: this.state.data.sort((a, b) => a.value - b.value),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          roseType: 'radius'
        }
      ]
    }
  }
  render() {
    return (
      <section>
        <Card title="饼图一" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionOne()} theme="vintage"/>
        </Card>
        <Card title="饼图二" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionTwo()} theme="vintage"/>
        </Card>
        <Card title="饼图三 （南丁格尔玫瑰图, 极区图）通过半径区分数据的大小" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionThree()} theme="vintage"/>
        </Card>
      </section>
    )
  }
}
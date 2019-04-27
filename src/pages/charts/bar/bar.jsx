import '../echarts.less'
import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import { ajax } from 'common/js/ajax'
import colorTheme from 'config/colorTheme'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {
  state = {
    legend: ['摩拜', 'ofo', '青桔', '小蓝']
  }
  componentWillMount() {
    echarts.registerTheme('vintage', {
      color: colorTheme,
      backgroundColor: '#f3f3f3',
      graph: {
        color: colorTheme
      }
    })
    this._getBarOne()
    this._getBarTwo()
  }
  _getBarOne = () => {
    ajax({ url: '/echarts/bar/one' }).then(res => {
      this.setState({
        barOne: Object.values(res.result.data)
      })
    })
  }
  _getBarTwo = () => {
    ajax({ url: '/echarts/bar/two' }).then(res => {
      let { mbike, ofo, green, blue } = res.result
      this.setState({
        mbike: Object.values(mbike),
        ofo: Object.values(ofo),
        green: Object.values(green),
        blue: Object.values(blue)
      })
    })
  }
  getOptionOne = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer : {          // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'订单量',
          type:'bar',
          barWidth: '40%',
          data: this.state.barOne
        }
      ]
    }
  }
  getOptionTwo = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: this.state.legend
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.state.legend[0],
          type:'bar',
          data: this.state.mbike,
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          name: this.state.legend[1],
          type:'bar',
          data: this.state.ofo,
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          name: this.state.legend[2],
          type:'bar',
          data: this.state.green,
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          name: this.state.legend[3],
          type:'bar',
          data: this.state.blue,
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
      ]
    }
  }
  render() {
    return (
      <section>
        <Card title="柱形图" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionOne()} theme="vintage"/>
        </Card>
        <Card title="堆叠柱状图" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionTwo()} theme="vintage"/>
        </Card>
      </section>
    )
  }
}
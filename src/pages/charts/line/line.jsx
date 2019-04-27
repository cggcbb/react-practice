import '../echarts.less'
import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts'
import { ajax } from 'common/js/ajax'
import colorTheme from 'config/colorTheme'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component {
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
    this._getLineOne()
    this._getLineTwo()
  }
  _getLineOne = () => {
    ajax({ url: '/echarts/line/one' }).then(res => {
      this.setState({
        barOne: Object.values(res.result.data)
      })
    })
  }
  _getLineTwo = () => {
    ajax({ url: '/echarts/line/two' }).then(res => {
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
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'订单量',
          type:'line',
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
        trigger: 'axis'
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
          type:'line',
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
          type:'line',
          data: this.state.ofo
        },
        {
          name: this.state.legend[2],
          type:'line',
          data: this.state.green
        },
        {
          name: this.state.legend[3],
          type:'line',
          data: this.state.blue
        },
      ]
    }
  }
  render() {
    return (
      <section>
        <Card title="折线图一" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionOne()} theme="vintage"/>
        </Card>
        <Card title="折线图二" className="card-wrapper" hoverable>
          <ReactEcharts className="react-echarts" option={this.getOptionTwo()} theme="vintage"/>
        </Card>
      </section>
    )
  }
}
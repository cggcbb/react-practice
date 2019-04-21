import React from 'react'
import { Card } from 'antd'

export default class Bar extends React.Component {
  render() {
    return (
      <section>
        <Card title="柱形图一" className="card-wrapper" hoverable size="small"></Card>
        <Card title="柱形图二" className="card-wrapper" hoverable size="small"></Card>
      </section>
    )
  }
}
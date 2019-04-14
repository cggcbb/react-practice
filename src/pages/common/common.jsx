import { Row } from 'antd'
import Header from 'components/header/header'
import React from 'react'

import 'style/common.less'

// import Home from 'pages/home'

class Common extends React.Component {
  render() {
    return (
      <section>
        <Row className="container second-page">
          <Header type="second"></Header>
        </Row>
        <Row className="second-content">
          {this.props.children}
        </Row>
      </section>
    )
  }
}

export default Common

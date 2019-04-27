import { Row, Col } from 'antd'
import Footer from 'components/footer/footer'
import Header from 'components/header/header'
import Nav from 'components/nav/nav'
import React from 'react'

import 'style/common.less'

class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <Nav/>
        </Col>
        <Col span={21} className="main">
          <Header></Header>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    )
  }
}

export default Admin

import './App.css'
import 'style/common.less'
import React from 'react'
import { Row, Col } from 'antd';
import Header from 'components/header'
import Footer from 'components/footer'
import Nav from 'components/nav'
import Home from 'pages/home'

class App extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <Nav/>
        </Col>
        <Col span={21} className="main">
          <Header></Header>
          <Row className="content">
            <Home/>
            {/* this.props.children */}
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    );
  }
}

export default App

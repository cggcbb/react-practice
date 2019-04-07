import React from 'react'
import { Card, Row, Col } from 'antd'

import './gallery.less'

export default class messages extends React.Component {
  render() {
    let imgName = 1
    const imgOrigin = []
    for (let i = 0; i < 4; i++) {
      imgOrigin[i] = []
      for (let j = 0; j < 6; j++) {
        imgOrigin[i][j] = `${imgName++}.jpg`
      }
    }
    const imgList = imgOrigin.map(list => list.map(item =>
      <Card 
        cover={
          <img src={`/gallery/${item}`} 
          alt="gallery" 
          style={{cursor: 'pointer'}}/>
        }
        key={item}
        className="gallery-card"
        >
        <Card.Meta
          title="React"
          description="This is description"
        />
      </Card>
      
    ))

    return (
      <section className="card-wrapper">
        <Row gutter={12}>
          {
            imgList.map((item, index) => {
              return <Col md={6} key={item[index].key}>{item}</Col>
            })
          }
        </Row>
      </section>
    )
  }
}
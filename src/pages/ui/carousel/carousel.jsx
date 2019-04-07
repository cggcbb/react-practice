import React from 'react'
import { Card, Carousel } from 'antd'

import './carousel.less'

export default class Carousels extends React.Component {
  render() {
    const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
    return (
      <section>
        <Card title="文字轮播" className="card-wrapper" hoverable size="small">
          <Carousel autoplay>
            <div><h3>Ant Motion Banner - React</h3></div>
            <div><h3>Ant Motion Banner - Vue</h3></div>
            <div><h3>Ant Motion Banner - Angular</h3></div>
          </Carousel>
        </Card>
        <Card title="水平方向图片轮播  (淡隐淡出)" className="card-wrapper carousel-wrapper" hoverable size="small">
          <Carousel autoplay effect="fade">
            {
              images.map(item => 
                <div key="item">
                  <img src={`/carousel/${item}`} alt="carousel" width="1716"/>
                </div>
              )
            }
          </Carousel>
        </Card>
        <Card title="垂直方向图片轮播" className="card-wrapper carousel-wrapper" hoverable size="small">
          <Carousel autoplay vertical>
            {
              images.reverse().map(item => 
                <div key="item">
                  <img src={`/carousel/${item}`} alt="carousel" width="1716"/>
                </div>
              )
            }
          </Carousel>
        </Card>
      </section>
    )
  }
}
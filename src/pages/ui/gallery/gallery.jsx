import React from 'react'
import { Card, Row, Col, Modal, Button, Icon, message } from 'antd'

export default class messages extends React.Component {
  componentWillMount() {
    let imgName = 1
    const imgOrigin = []
    for (let i = 0; i < 4; i++) {
      imgOrigin[i] = []
      for (let j = 0; j < 6; j++) {
        imgOrigin[i][j] = `${imgName++}.jpg`
      }
    }
    this.setState({
      imgOrigin,
      visible: false
    })
  }
  render() {
    const imgList = this.state.imgOrigin.map(list => list.map(item =>
      <Card 
        cover={
          <img src={`/gallery/${item}`} 
          alt="gallery" 
          style={{cursor: 'pointer'}}
          onClick={() => this.openGallery(item)}
          />
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
        <Modal
          visible={this.state.visible}
          onCancel={this.closeGallery}
          title="图片预览"
          centered
          width={1008}
          className="modal-gallery"
          footer={[
              <Button key="prev" onClick={this.prev}><span><Icon type="left"/>&nbsp;上一张</span></Button>,
              <Button key="next" onClick={this.next}><span>下一张&nbsp;<Icon type="right" /></span></Button>
          ]}
        > 
          <img src={this.state.currentImage} alt="currentImage" width="960"/>
        </Modal>
      </section>
    )
  }
  openGallery = (pictureName) => {
    this.setState({
      visible: true,
      currentImage: `/gallery/${pictureName}`
    })
  }
  closeGallery = () => {
    this.setState({
      visible: false
    })
  }
  // 上一张
  prev = () => {
    let currentIndex = this._findCurrentImage()
    if (Object.is(currentIndex, 0)) {
      message.info('已经是第一张图片了 ~~~')
      return
    }
    this._changeCurrentImage(currentIndex - 1)
  }
  // 下一张
  next = () => {
    let originPic = this.state.imgOrigin 
    let currentIndex = this._findCurrentImage()
    if (Object.is(currentIndex, originPic.flat().length - 1)) {
      message.info('已经是最后一张图片了 ~~~')
      return
    }
    this._changeCurrentImage(currentIndex + 1)
  }
   // 找到当前展示图片索引
  _findCurrentImage = () => {
    let currentImage = this.state.currentImage
    let originPic = this.state.imgOrigin
    return originPic.flat().findIndex(el => `/gallery/${el}` === currentImage)
  }
  // 更新当前展示图片
  _changeCurrentImage = (index) => {
    let originPic = this.state.imgOrigin
    let showIndex = originPic.flat()[index]
    this.setState({
      currentImage: `/gallery/${showIndex}`
    })
  }
}
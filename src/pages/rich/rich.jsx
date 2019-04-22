import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

export default class Tables extends React.Component {
  state = {
    isShowRichTextModal: false
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  onContentStateChange = (content) => {
    this.setState({
      content
    })
  }
  // 清空内容
  handleClearContent = () => {
    this.setState({
      editorState: null
    })
  }
  // 获取HTML文本内容
  handleGetHtmlText = () => {
    this.setState({
      isShowRichTextModal: true
    })
  }
  handleCancle = () => {
    this.setState({
      isShowRichTextModal: false
    })
  }
  render() {
    return (
      <section>
        <Card className="card-wrapper" size="default">
          <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetHtmlText}>获取HTML文本内容</Button>
        </Card>
        <Card title="富文本编辑器" className="card-wrapper">
          <Editor
            editorState={this.state.editorState}
            onContentStateChange={this.onContentStateChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="HTML文本内容"
          visible={this.state.isShowRichTextModal}
          onCancel={this.handleCancle}
          footer={null}
        >
          {draftToHtml(this.state.content)}
        </Modal>
      </section>
    )
  }
}
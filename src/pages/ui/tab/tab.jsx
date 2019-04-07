import React from 'react'

import { Card, Tabs, message, Icon } from 'antd'

const TabPane = Tabs.TabPane

export default class Tab extends React.Component {
  constructor(props) {
    super(props)
    const panes = [
      { key: '1', title: 'tab1', content: 'Content of Tab Pane 1' },
      { key: '2', title: 'tab2', content: 'Content of Tab Pane 2' },
      { key: '3', title: 'tab3', content: 'Content of Tab Pane 3' }
    ]
    this.state = {
      activeKey: panes[0].key,
      panes
    }
    this.newContent = panes.length + 1
  }
  handleChange(key) {
    message.info(`Hi, 你选择了页签: ${key}`)
  }
  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  add = () => {
    const panes = this.state.panes
    const activeKey = (panes.length + 1).toString()
    panes.push({
      key: activeKey,
      title: 'New Tab',
      content: `this.state.newContent : ${this.newContent ++} `
    })
    this.setState({
      panes, activeKey
    })
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey })
    this.newContent--
  }
  render() {
    return (
      <section>
        <Card title="Tab页签" className="card-wrapper" hoverable size="small">
          <Tabs defaultActiveKey="1" onChange={this.handleChange} size="small">
            <TabPane tab="tab1" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="tab2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="tab3" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="带图标的Tab页签" className="card-wrapper" hoverable size="small">
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab={<span><Icon type="plus" />tab1</span>} key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab={<span><Icon type="edit" />tab2</span>} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type="delete" />tab3</span>} key="3" disabled>Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="动态添加Tab页签" className="card-wrapper" hoverable size="small">
          <Tabs type="editable-card" activeKey={this.state.activeKey} onChange={this.onChange} onEdit={this.onEdit}>
            {
              this.state.panes.map(pane => {
                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
              })
            }
          </Tabs>
        </Card>
      </section>
    )
  }
} 
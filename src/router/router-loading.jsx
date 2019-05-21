import React from 'react'
import { Spin } from 'antd'

// 页面加载背景
export const loading = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div style={{position: 'absolute', width: '100%', height: 'calc(100vh)', background: '#fff'}}>
        <div style={
          {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            textAlign: 'center',
            lineHeight: 'calc(100vh)',
            fontStyle: 'italic'
          }
        }
        >
          <Spin size="large" />
        </div>
    </div>
    )
  }
  else if (error) {
    return `Sorry, there was a problem loading the page.`
  }
  else {
    return null
  }
}

// 不需要加载样式
export const noLoading = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      null
    )
  }
  else if (error) {
    return `Sorry, there was a problem loading the page.`
  }
  else {
    return null
  }
}
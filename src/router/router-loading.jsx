import React from 'react'

// 登录页面加载背景提示
export const loginLoadingComponent = ({ isLoading, error }) => {
  const loadingText = (text) => {
    return <div style={{position: 'absolute', width: '100%', height: 'calc(100vh)', background: 'rgba(0, 0, 0, .9)'}}>
      <div style={
        {
          position: 'absolute',
          color: '#fff',
          fontSize: 40,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          textAlign: 'center',
          lineHeight: 'calc(100vh)',
          letterSpacing: 3,
          fontStyle: 'italic'
        }
      }
      >{text}</div>
    </div>
  }
  if (isLoading) {
    return (
      loadingText('Loading ...')
    )
  }
  else if (error) {
    return loadingText('Sorry, there was a problem loading the page.')
  }
  else {
    return null
  }
}
// 其他页面加载
export const loading = ({ isLoading }) => {
  if (isLoading) {
    return (
      ''
    )
  }
  return null
}
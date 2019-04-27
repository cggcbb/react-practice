import './login.less'
import React from 'react'
import { connect } from 'react-redux'
import { updateToken } from '@/redux/action/action'
import { ajax } from 'common/js/ajax'
import { message } from 'antd'

class Login extends React.Component {
  state = {}

  handleSubmit = () => {
    const { username, password } = this.state
    if (!username) {
      message.error(`请输入用户账号`)
      return
    }
    if (!password) {
      message.error(`请输入登录密码`)
      return
    }
    ajax({ url: '/login', isShowLoading: false }).then(res => {
      if (res.code === 0) {
        let { _token } = res.result
        const { dispatch } = this.props
        dispatch(updateToken(_token))
        window.sessionStorage.setItem('_token', _token)
        window.location.hash = '#/index'
      } else {
        message.error(res.msg)
      }
    })
  }
  handleUserNameChange = () => {
    let { usernameDom = document.getElementById('username')} = this.state
    this.setState({
      usernameDom,
      username: usernameDom.value
    })
  }
  handlePasswordChange = () => {
    let { passwordDom = document.getElementById('password')} = this.state
    this.setState({
      passwordDom,
      password: passwordDom.value
    })
  }
  render() {
    return (
      <section className="login-wrapper">
        <div className="login-bg-mask"></div>
        <div className="login-box">
          <div className="login-title">
            <h2>管理系统平台</h2>
            <span>版权所有 © 2015-2019 成都肥湖队网络科技有限公司</span>
          </div>
          <form className="form-login">
            <div className="form-item">
              <span className="item-label">输入账号</span>
              <div className="form-input-wrapper">
                <span className="user-name"><i></i></span>
                <input placeholder="Except for any one of the null values" className="form-input" id="username" type="text" onChange={this.handleUserNameChange}></input>
              </div>
            </div>
            <div className="form-item">
              <span className="item-label">登录密码</span>
              <div className="form-input-wrapper">
                <span className="user-password"><i></i></span>
                <input placeholder="Except for any one of the null values" className="form-input" id="password" type="password" onChange={this.handlePasswordChange}></input>
              </div>
            </div>
            <div className="form-submit-wrapper">
              <span className="forget-password">忘记密码 ?</span>
              <button type="button" className="submit" onClick={this.handleSubmit}>登录</button>
            </div>
          </form>
          <div className="login-title">
            <p>推荐使用现代浏览器，如 chrome、Firefox 等</p>
          </div>
        </div>
      </section>
    ) 
  }
}
const mapStateToProps = state => {
  return {
    token: state.token
  }
}
export default connect(mapStateToProps)(Login)

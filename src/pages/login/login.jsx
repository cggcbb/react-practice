import './login.less'
import React from 'react'
import { connect } from 'react-redux'
import { updateToken } from '@/redux/action/action'
import { ajax } from 'common/js/ajax'

class Login extends React.Component {

  handleSubmit = () => {
    ajax({ url: '/login', isShowLoading: false }).then(res => {
      if (res.code === 0) {
        let { _token } = res.result
        const { dispatch } = this.props
        dispatch(updateToken(_token))
        window.location.hash = '#/index'
      }
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
                <input className="form-input" type="text"></input>
              </div>
            </div>
            <div className="form-item">
              <span className="item-label">登录密码</span>
              <div className="form-input-wrapper">
                <span className="user-password"><i></i></span>
                <input className="form-input" type="password"></input>
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

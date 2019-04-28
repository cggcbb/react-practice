import './login.less'
import React from 'react'
import { connect } from 'react-redux'
import { updateToken } from '@/redux/action/action'
import { ajax } from 'common/js/ajax'
import { message } from 'antd'

class Login extends React.Component {
  state = {}

  componentDidMount() {
    // 渲染canvas
    this.renderCanvas()
  }
  renderCanvas = () => {
    let can = document.getElementById(`canvas`)
		let cxt = can.getContext(`2d`)
		let w = can.width = window.innerWidth   // 设置canvas宽度
		let h = can.height = window.innerHeight // 设置canvas高度
		let data = []                           // 定义一个数组，准备用来存点坐标
		let num = 150                           // 定义点数量
		let meteors = []                        // 流行数组
		let k = -1                              // 固定流星斜率
		let range = Math.atan(k)                // 流星弧度
		let length = 240                        // 流星长度

    // 画点
		const circle = (x, y, r) => {
			cxt.save()
			let rad = cxt.createRadialGradient(x, y, 0, x, y, r)
			rad.addColorStop(0, `rgba(255,255,255,0.8)`)
			rad.addColorStop(0.1, `rgba(255,255,255,0.8)`)
			rad.addColorStop(0.2, `rgba(255,255,255,0.08)`)
			rad.addColorStop(1, `rgba(255,255,255,0)`)
			cxt.fillStyle = rad
			cxt.beginPath()
			cxt.arc(x, y, r, 0, Math.PI * 2, false)
			cxt.closePath()
			cxt.fill()
			cxt.restore()
    }
    
    // 画流星
		const drawMeteor = (currX, startX, startY) => {
			cxt.save()
			let currY = getY(currX, startX, startY)
			let r = 15
			// 设置流星头部渐变色
			let rad = cxt.createRadialGradient(currX, currY, 0, currX, currY, r)
			rad.addColorStop(0, `rgba(255,255,255,0.8)`)
			rad.addColorStop(0.1, `rgba(255,255,255,0.8)`)
			rad.addColorStop(0.2, `rgba(255,255,255,0.08)`)
			rad.addColorStop(1, `rgba(255,255,255,0)`)
			cxt.fillStyle = rad
			// 画流星头部
			cxt.beginPath()
			cxt.arc(currX, currY, r, 0, Math.PI * 2, false)
			cxt.closePath()
			cxt.fill()
			cxt.restore()
			// 尾巴坐标
			let tailX = currX + Math.cos(range) * length
			let tailY = currY + Math.sin(range) * length

			// 头部坐标右边连线点
			let pointRight = {
        x: currX + 3,
        y: currY
      }
			// 头部坐标上方连线点
			let pointTop = {
        x: currX, 
        y: currY - 3
      }

			cxt.save()
			// 设置尾巴渐变色
			let rad2 = cxt.createRadialGradient(currX, currY, 0, currX, currY, length)
			rad2.addColorStop(0, `rgba(255,255,255,0.3)`)
			rad2.addColorStop(1, `rgba(255,255,255,0)`)
			cxt.fillStyle = rad2
			// 画流星尾巴
			cxt.beginPath()
			cxt.moveTo(pointRight.x, pointRight.y)
			cxt.lineTo(pointTop.x, pointTop.y)
			cxt.lineTo(tailX, tailY)
			cxt.closePath()
			cxt.fill()
			cxt.restore()
    }
    
    // 获取Y坐标
    const getY = (x, startX, startY) => k * (x - startX) + startY

		// 生成num个点，并且存储初始点坐标
		for (let i = 0; i < num; i++){
			data[i] = {
        x: Math.random() * w, 
        y: Math.random() * h, 
        r: Math.random() * 8 + 3
      }
			circle(data[i].x, data[i].y, data[i].r)
    }
    function draw() {
			cxt.clearRect(0, 0, w, h)
			for (let i = 0; i < num; i++) {
				data[i].r += Math.random() * 2 - 1
				data[i].r = Math.max(0, data[i].r)
				data[i].r = Math.min(12, data[i].r)
				circle(data[i].x, data[i].y, data[i].r)
			}
			if (meteors.length){
				for (let i in meteors){
					meteors[i].changeX -= 15
					drawMeteor(meteors[i].changeX, meteors[i].x, meteors[i].y)
					if (meteors[i].changeX < 0 || getY(meteors[i].changeX, meteors[i].X, meteors[i].y) > h){
						meteors.splice(i, 1)
					}
				}
			}
			if (Math.random() > 0.98) {
				let randomX = Math.random() * (w - 300) + 300
				meteors.push({
          x: randomX, 
          y: 0 ,
          changeX: randomX
        })
			}
			window.requestAnimationFrame(draw)
		}
    draw()
  }
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
        <canvas id='canvas'></canvas>
        <div className="login-c"></div>
        <div className="login-box">
          <div className="login-title">
            <h2>管理系统平台</h2>
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
            <span>版权所有 © 2015-2019 成都肥湖队网络科技有限公司</span>
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

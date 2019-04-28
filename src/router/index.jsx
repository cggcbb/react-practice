import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthorizeRoute } from './authorize'
import Loadable from 'react-loadable'
import React from 'react'

// 登录页面加载背景提示
const loginLoadingComponent = ({ isLoading, error }) => {
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
const loading = ({ isLoading }) => {
  if (isLoading) {
    return (
      ''
    )
  }
  return null
}

const Admin =        Loadable({ loader: () => import('pages/admin/admin'), loading })
const App =          Loadable({ loader: () => import('@/App'), loading })
const Button =       Loadable({ loader: () => import('pages/ui/button/button'), loading })
const Loading =      Loadable({ loader: () => import('pages/ui/loading/loading'), loading })
const Login =        Loadable({ loader: () => import('pages/login/login'), loading: loginLoadingComponent })
const Home =         Loadable({ loader: () => import('pages/home/home'), loading })
const Modal =        Loadable({ loader: () => import('pages/ui/modal/modal'), loading })
const Notice =       Loadable({ loader: () => import('pages/ui/notice/notice'), loading })
const Message =      Loadable({ loader: () => import('pages/ui/message/message'), loading })
const Tab =          Loadable({ loader: () => import('pages/ui/tab/tab'), loading })
const Gallery =      Loadable({ loader: () => import('pages/ui/gallery/gallery'), loading })
const Carousel =     Loadable({ loader: () => import('pages/ui/carousel/carousel'), loading })
const FormLogin =    Loadable({ loader: () => import('pages/form/login/login'), loading })
const FormRegister = Loadable({ loader: () => import('pages/form/register/register'), loading })
const BasicTable =   Loadable({ loader: () => import('pages/table/basic/basic'), loading })
const HighTable =    Loadable({ loader: () => import('pages/table/high/high'), loading })
const City =         Loadable({ loader: () => import('pages/city/city'), loading })
const Order =        Loadable({ loader: () => import('pages/order/order'), loading })
const OrderDetail =  Loadable({ loader: () => import('pages/order/detail'), loading })
const Common =       Loadable({ loader: () => import('pages/common/common'), loading })
const BikeMap =      Loadable({ loader: () => import('pages/bike-map/bike-map'), loading })
const User =         Loadable({ loader: () => import('pages/user/user'), loading })
const Bar =          Loadable({ loader: () => import('pages/charts/bar/bar'), loading })
const Pie =          Loadable({ loader: () => import('pages/charts/pie/pie'), loading })
const Line =         Loadable({ loader: () => import('pages/charts/line/line'), loading })
const Rich =         Loadable({ loader: () => import('pages/rich/rich'), loading })
const Permission =   Loadable({ loader: () => import('pages/permission/permission'), loading })
const NoMatch =      Loadable({ loader: () => import('pages/no-match/no-match'), loading })


export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={() => 
              <Common>
                <Route path="/common/order/detail/:orderNo" component={OrderDetail}/>
              </Common>
            }/>
            <Route path="/index" render={() => {
              return (
                <Admin>
                  <Switch>
                    <AuthorizeRoute exact path="/index" component={Home}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/button" component={Button}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/modal" component={Modal}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/loading" component={Loading}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/notification" component={Notice}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/message" component={Message}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/tab" component={Tab}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/gallery" component={Gallery}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/ui/carousel" component={Carousel}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/form/login" component={FormLogin}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/form/register" component={FormRegister}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/table/basic" component={BasicTable}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/table/high" component={HighTable}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/city" component={City}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/order" component={Order}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/bikeMap" component={BikeMap}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/user" component={User}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/charts/bar" component={Bar}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/charts/pie" component={Pie}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/charts/line" component={Line}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/rich" component={Rich}></AuthorizeRoute>
                    <AuthorizeRoute path="/index/permission" component={Permission}></AuthorizeRoute>
                    <AuthorizeRoute component={NoMatch} />
                  </Switch>
                </Admin>
              )
            }}></Route>
            <Redirect from="/" to="/login"/>
            <AuthorizeRoute component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
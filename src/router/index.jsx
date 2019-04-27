import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthorizeRoute } from './authorize'
import Admin from 'pages/admin/admin'
import App from '@/App'
import Button from 'pages/ui/button/button'
import Loading from 'pages/ui/loading/loading'
import Login from 'pages/login/login'
import Home from 'pages/home/home'
import Modal from 'pages/ui/modal/modal'
import Notice from 'pages/ui/notice/notice'
import Message from 'pages/ui/message/message'
import Tab from 'pages/ui/tab/tab'
import Gallery from 'pages/ui/gallery/gallery'
import Carousel from 'pages/ui/carousel/carousel'
import FormLogin from 'pages/form/login/login'
import FormRegister from 'pages/form/register/register'
import BasicTable from 'pages/table/basic/basic'
import HighTable from 'pages/table/high/high'
import City from 'pages/city/city'
import Order from 'pages/order/order'
import OrderDetail from 'pages/order/detail'
import Common from 'pages/common/common'
import BikeMap from 'pages/bike-map/bike-map'
import User from 'pages/user/user'
import Bar from 'pages/charts/bar/bar'
import Pie from 'pages/charts/pie/pie'
import Line from 'pages/charts/line/line'
import Rich from 'pages/rich/rich'
import Permission from 'pages/permission/permission'
import NoMatch from 'pages/no-match/no-match'
import React from 'react'

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
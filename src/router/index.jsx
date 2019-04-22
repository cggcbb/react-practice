import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
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
            <Route path="/" render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/ui/button" component={Button}></Route>
                    <Route path="/ui/modal" component={Modal}></Route>
                    <Route path="/ui/loading" component={Loading}></Route>
                    <Route path="/ui/notification" component={Notice}></Route>
                    <Route path="/ui/message" component={Message}></Route>
                    <Route path="/ui/tab" component={Tab}></Route>
                    <Route path="/ui/gallery" component={Gallery}></Route>
                    <Route path="/ui/carousel" component={Carousel}></Route>
                    <Route path="/form/login" component={FormLogin}></Route>
                    <Route path="/form/register" component={FormRegister}></Route>
                    <Route path="/table/basic" component={BasicTable}></Route>
                    <Route path="/table/high" component={HighTable}></Route>
                    <Route path="/city" component={City}></Route>
                    <Route path="/order" component={Order}></Route>
                    <Route path="/bikeMap" component={BikeMap}></Route>
                    <Route path="/user" component={User}></Route>
                    <Route path="/charts/bar" component={Bar}></Route>
                    <Route path="/charts/pie" component={Pie}></Route>
                    <Route path="/charts/line" component={Line}></Route>
                    <Route path="/rich" component={Rich}></Route>
                    <Redirect to="/home"/>
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )
            }}></Route>
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
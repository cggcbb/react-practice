import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from 'pages/admin/admin'
import App from '@/App'
import Button from 'pages/ui/button/button'
import Loading from 'pages/ui/loading/loading'
import Login from 'pages/login/login'
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
import NoMatch from 'pages/no-match/no-match'
import React from 'react'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path="/admin/ui/button" component={Button}></Route>
                    <Route path="/admin/ui/modal" component={Modal}></Route>
                    <Route path="/admin/ui/loading" component={Loading}></Route>
                    <Route path="/admin/ui/notification" component={Notice}></Route>
                    <Route path="/admin/ui/message" component={Message}></Route>
                    <Route path="/admin/ui/tab" component={Tab}></Route>
                    <Route path="/admin/ui/gallery" component={Gallery}></Route>
                    <Route path="/admin/ui/carousel" component={Carousel}></Route>
                    <Route path="/admin/form/login" component={FormLogin}></Route>
                    <Route path="/admin/form/register" component={FormRegister}></Route>
                    <Route path="/admin/table/basic" component={BasicTable}></Route>
                    <Route path="/admin/table/high" component={HighTable}></Route>
                    <Route path="/admin/city" component={City}></Route>
                    <Route path="/admin/order" component={Order}></Route>
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )
            }}></Route>
            <Route path="/order/detail" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
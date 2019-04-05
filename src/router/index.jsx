import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from 'pages/admin/admin'
import App from '@/App'
import Button from 'pages/ui/button/button'
import Loading from 'pages/ui/loading/loading'
import Login from 'pages/login/login'
import Modal from 'pages/ui/modal/modal'
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
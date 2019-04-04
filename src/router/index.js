import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from 'pages/admin'
import App from '@/App'
import Button from 'pages/ui/button'
import Login from 'pages/login'
import NoMatch from 'pages/no-match'
import React from 'react'

export default class Router extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={() => {
            return (
              <Admin>
                <Switch>
                  <Route path="/admin/ui/button" component={Button}></Route>
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )
          }}></Route>
          <Route path="/order/detail" component={Login} />
        </App>
      </HashRouter>
    )
  }
}
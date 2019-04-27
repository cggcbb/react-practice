import React from 'react'
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
 
export const AuthorizeRoute = ({ component: ComposedComponent, ...rest }) => {
  class Authentication extends React.Component {
    render() {
      let isLogin = this.props.token ? this.props.token : window.sessionStorage.getItem('_token')
      return (
        <Route
          {...rest}
          render={props =>
            !isLogin ? 
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
             : <ComposedComponent {...props} />
          }
        />
      )
    }
  }
  const AuthenticationContainer = connect(state => {
    return {
      token: state.token
    }
  })(Authentication)
  return <AuthenticationContainer />
}
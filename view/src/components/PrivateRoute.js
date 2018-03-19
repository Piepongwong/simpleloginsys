import React from "react"
import { connect } from 'react-redux'
import { withRouter, Redirect} from 'react-router-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest, isLoggedIn}) => (
	<Route {...rest} render={(props)=> (
		isLoggedIn?
		<Component {...props} />:
		<Redirect to='/login' />
		)} />
	)
	
const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  }
}

const ConnectedPrivateRoute = withRouter(connect(
	mapStateToProps,
	null
)(PrivateRoute))
export {ConnectedPrivateRoute as PrivateRoute}
import React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const UserUnconnected = ({session})=>  (
		<main className="content sidebar-hidden">
			<h1> Firstname: {session.firstname}</h1>
			<h1> Lastname: {session.lastname}</h1>
			<h1> Email: {session.email}</h1>
		</main>						
	)

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

 const User = withRouter(connect(
	mapStateToProps,
	null
)(UserUnconnected))

export default User
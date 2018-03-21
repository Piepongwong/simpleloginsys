import React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const UserUnconnected = ({session})=>  (
		<main className="content sidebar-hidden text-center">

			<div className="card  w-100">
			  <div className="card-body">
				<p> Firstname: {session.firstname}</p>
				<p> Lastname: {session.lastname}</p>
				<p> Email: {session.email}</p>			  
			</div>
			</div>			
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
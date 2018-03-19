import React from "react"
import { connect } from 'react-redux'
import { Button, Container, Form, FormGroup, Label, Input, FormText, Row, Col, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'


class UserUnconnected extends React.Component {

	constructor(props) {
		super(props)


	}

	
	render () {
		return (
			<main className="content sidebar-hidden">
				<h1> Firstname: {this.props.session.firstname}</h1>
				<h1> Lastname: {this.props.session.lastname}</h1>
				<h1> Email: {this.props.session.email}</h1>
			</main>						

		)
	}
}


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
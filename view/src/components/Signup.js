import React from "react"
import { connect } from 'react-redux'
import {signup, emailCheck, usernameCheck} from "../actions/root"
import { Button, Form, FormGroup, Label, Input,  Row, Col, FormFeedback } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'

const formS = {
  minHeight: "100vh",   
  display: "flex",
  alignItems: "center",
  width: "100%"
}

class SignupUnconnected extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: "",
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			password_check: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.checkUsernameAvailability = this.checkUsernameAvailability.bind(this)
		this.checkEmailAvailability = this.checkEmailAvailability.bind(this)

	}
	handleSubmit(e) {
		e.preventDefault()		
		this.props.signup(this.state.username, this.state.firstname, this.state.lastname, this.state.email, this.state.password)
	}

	handleChange(e) {
		e.preventDefault()
		this.setState({[e.target.name]: e.target.value})
	}

	checkUsernameAvailability(e) {
		this.props.usernameCheck(e.target.value)
	}

	checkEmailAvailability(e) {
		this.props.emailCheck(e.target.value)
	}
	render () {
		return (
			<div  className="vertical-center container">
				<Row style={formS} className="justify-content-center "> 
					<Col sm="6">
						<h1> Sign up </h1>
						<hr/>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup >
					         	<Label for="username">Username</Label>				
								{!this.props.invalidUsername? 
									<Input required onBlur={this.checkUsernameAvailability} onChange={this.handleChange} name="username" value={this.state.username} placeholder="username"/>:
									<div>
										<Input invalid required onBlur={this.checkUsernameAvailability} onChange={this.handleChange} name="username" value={this.state.username} placeholder="username"/>
										<FormFeedback>Username already exists</FormFeedback>					
									</div>
								}
							</FormGroup>
							<FormGroup >
					         	<Label for="firstname">Firstname</Label>				
								<Input required onChange={this.handleChange} name="firstname" value={this.state.firstname} placeholder="firstname"/>
							</FormGroup>
							<FormGroup >
					         	<Label for="lastname">Lastname</Label>				
								<Input required onChange={this.handleChange} name="lastname" value={this.state.lastname} placeholder="lastname"/>
							</FormGroup>
							<FormGroup >
								<Label for="username">Email</Label>				
								{!this.props.invalidEmail? 
									<Input required onBlur={this.checkEmailAvailability} onChange={this.handleChange} name="email" value={this.state.email} placeholder="email"/>:
									<div>
										<Input type="email" invalid required onBlur={this.checkUsernameAvailability} onChange={this.handleChange} name="email" value={this.state.email} placeholder="email"/>
										<FormFeedback>Email already exists</FormFeedback>					
									</div>
								}							
							</FormGroup>
							<FormGroup >
					         	<Label for="password">Password</Label>				
								<Input required onChange={this.handleChange} name="password" type="password" value={this.state.password} placeholder="password"/>
							</FormGroup>								
							<FormGroup >
					         	<Label for="password">Password confirm</Label>				
								{this.state.password !== this.state.password_check? 
									<div>
										<Input invalid required onChange={(this.handleChange)} name="password_check" type="password" value={this.state.password_check} placeholder="password"/>
										<FormFeedback>Passwords do not match</FormFeedback>
									</div>:
									<Input required onChange={(this.handleChange)} name="password_check" type="password" value={this.state.password_check} placeholder="username or password"/>						
								}
							</FormGroup>								
							<Button type="submit" value="submit">Submit</Button>											
						</Form>	
						<hr />
						<Row className="justify-content-center">
							<Col  sm="12">
								<p  className="pl-2 mb-3">Already have an account?</p>
								<Link to="/login"><Button className="w-100 m4">Login</Button></Link>
							</Col>
						</Row>
					</Col>										
				</Row>	
			</div>		
		)
	}
}

const mappDispatchToProps = dispatch => {
	return ({
		signup: (username, firstname,lastname, email, password, password2)=> {
			dispatch(signup(username, firstname,lastname, email, password))
		},
		emailCheck: (email) => {
			dispatch(emailCheck(email))
		},
		usernameCheck: (username)=> {
			dispatch(usernameCheck(username))
		}

	})
}

const mapStateToProps = state => {
  return {
    invalidEmail: state.signUp.invalidEmail,
    invalidUsername: state.signUp.invalidUsername
  }
}

export const Signup = withRouter(connect(
	mapStateToProps,
	mappDispatchToProps
)(SignupUnconnected))

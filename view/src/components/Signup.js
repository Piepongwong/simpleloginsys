import React from "react"
import { connect } from 'react-redux'
import {signup} from "../actions/root"
import { Button, Container, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const formS = {
  minHeight: "100%",
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
			password: "",
			password2: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.checkAvailability = this.checkAvailability.bind(this)
	}
	handleSubmit(e) {
		e.preventDefault()		
		this.props.authorize(this.state.username, this.state.password)
	}

	handleChange(e) {
		e.preventDefault()
		this.setState({[e.target.name]: e.target.value})
	}

	checkAvailability(e) {
		console.log("hiii")
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
								<Input required onBlur={this.checkAvailability} onChange={this.handleChange} name="username" value={this.state.username} placeholder="username"/>
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
					         	<Label for="email">Email</Label>				
								<Input onBlur={this.checkAvailability} onChange={this.handleChange}  type="email" required name="email" value={this.state.email} placeholder="email"/>
							</FormGroup>
							<FormGroup >
					         	<Label for="password">Password</Label>				
								<Input required onChange={this.handleChange} name="password" type="password" value={this.state.password} placeholder="username or password"/>
							</FormGroup>								
							<FormGroup >
					         	<Label for="password">Password</Label>				
								<Input required onChange={this.handleChange} name="password2" type="password" value={this.state.password2} placeholder="username or password"/>
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
			dispatch(signup(username, firstname,lastname, email, password, password2))
		}
	})
}

export const Signup = withRouter(connect(
	null,
	mappDispatchToProps
)(SignupUnconnected))

import React from "react"
import { connect } from 'react-redux'
import {authorize, authorizeFB} from "../actions/root"
import { Button, Container, Form, FormGroup, Label, Input, FormText, Row, Col, FormFeedback} from 'reactstrap'
import FacebookLogin from 'react-facebook-login'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const formS = {
  minHeight: "100%",
  minHeight: "100vh",   
  display: "flex",
  alignItems: "center",
  width: "100%"
}
class LoginUnconnected extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: ""		
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleSubmit(e) {
		e.preventDefault()		
		this.props.authorize(this.state.username, this.state.password)
	}

	handleChange(e) {
		e.preventDefault()
		this.setState({[e.target.name]: e.target.value})
	}

	render () {
		return (
			<div  className="vertical-center container">
			<Row style={formS} className="justify-content-center"> 
				<Col sm="6">
					<h1> Login </h1>
					<hr />
					<Form onSubmit={this.handleSubmit}>
						<FormGroup >
		         			<Label for="username">Username or email</Label>				
							<Input required onChange={this.handleChange} name="username" value={this.state.username} placeholder="username or email"/>
						</FormGroup>
						<FormGroup >
							<Label for="password">Password</Label>
							<Input required onChange={this.handleChange} name="password" type="password" value={this.state.password} placeholder="password"/>	
						</FormGroup>
						<FormGroup>
							{this.props.invalidLogin?
							<div> 
								<Input invalid className="w-50 btn btn-secondary" type="submit" value="submit"/>
								<FormFeedback>Wrong username or password</FormFeedback>
							</div>:
								<Input className="w-50 btn btn-secondary" type="submit" value="submit"/>
							}
						</FormGroup>
					</Form>
					<p className="p-2 mb-0"> or</p>
					<FacebookLogin style={{backgroundColor: "blue"}} cssClass={"kep-login-facebook btn w-100 m5"}
						appId="411672582610628"
						autoLoad="true"
						fields="first_name, last_name, email, picture"
						callback={this.props.authorizeFB}
						icon="fa-facebook"
					/>
					<hr />
					<Row className="justify-content-center">
						<Col  sm="12">
							<p className="pl-2 mb-3">No account?</p>
							<Link to="/signup"><Button className="w-100 m4">Sign up </Button></Link>
						</Col>
					</Row>					
				</Col>
			</Row>
			</div>
		)
	}
}
const mapStateToProps = state => {
  return {
    invalidLogin: state.session.invalidLogin
  }
}

const mappDispatchToProps = dispatch => {
	return ({
		authorize: (username, password)=> {
			dispatch(authorize(username, password))
		},
		authorizeFB: (fbObject) => {
			dispatch(authorizeFB(fbObject))
		}
	})
}

export const Login = withRouter(connect(
	mapStateToProps,
	mappDispatchToProps
)(LoginUnconnected))


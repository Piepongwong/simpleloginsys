import React from "react"
import { connect } from 'react-redux'
import {changePassword} from "../actions/root"
import { Button, Form, FormGroup, Label, Input,  Row, Col, FormFeedback } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'

const formS = {
  minHeight: "100vh",   
  display: "flex",
  alignItems: "center",
  width: "100%"
}

class ChooseNewPassword extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			password: "",
			password_check: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleSubmit(e) {
		e.preventDefault()		
		this.props.changePassword(this.state.password, this.props.match.params.token)
	}

	handleChange(e) {
		e.preventDefault()
		this.setState({[e.target.name]: e.target.value})
	}

	render () {
		console.log(this.props.match.params.token)
		return (
			<div  className="vertical-center container">
				<Row style={formS} className="justify-content-center "> 
					<Col sm="6">
						<h1> Choose a new password </h1>
						<hr/>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup >
					         	<Label for="password">Password</Label>				
								<Input required onChange={this.handleChange} name="password" type="password" value={this.state.password} placeholder="username or password"/>
							</FormGroup>								
							<FormGroup >
					         	<Label for="password">Password</Label>				
								{this.state.password !== this.state.password_check? 
									<div>
										<Input invalid required onChange={(this.handleChange)} name="password_check" type="password" value={this.state.password_check} placeholder="username or password"/>
										<FormFeedback>Passwords do not match</FormFeedback>
									</div>:
									<Input required onChange={(this.handleChange)} name="password_check" type="password" value={this.state.password_check} placeholder="username or password"/>						
								}
							</FormGroup>	
							<Button type="submit" value="submit">Submit</Button>											
						</Form>	
					</Col>										
				</Row>	
			</div>		
		)
	}
}

const mappDispatchToProps = dispatch => {
	return ({
		changePassword: (password, token)=> {
			dispatch(changePassword(password, token))
		}

	})
}

const ChooseNewPasswordConnected = withRouter(connect(
	null,
	mappDispatchToProps
)(ChooseNewPassword))

export {ChooseNewPasswordConnected as ChooseNewPassword}
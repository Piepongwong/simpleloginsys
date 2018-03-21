import React from "react"
import { connect } from 'react-redux'
import {passwordReset} from "../actions/root"
import { Button, Form, FormGroup, Label, Input,  Row, Col, FormFeedback, Fade } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'

const formS = {
  minHeight: "100vh",   
  display: "flex",
  alignItems: "center",
  width: "100%"
}

class ResetPassword extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			usernameOrEmail: "",
			fadeIn: false			
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this);		
	}
	handleSubmit(e) {
		e.preventDefault()		
		this.props.passwordReset(this.state.usernameOrEmail)
	}

	handleChange(e) {
		e.preventDefault()
		this.setState({[e.target.name]: e.target.value})
	}
    toggle() {
        this.setState({
            fadeIn: true
        });
    }
	render () {
		return (
			<div  className="vertical-center container">
				<Row style={formS} className="justify-content-center "> 
					<Col sm="6">
						<h1> Reset your password </h1>
						<hr/>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup >
					         	<Label for="usernameOrEmail">Username or email</Label>				
								<Input required onChange={this.handleChange} name="usernameOrEmail" type="usernameOrEmail" value={this.state.usernameOrEmail} placeholder="username or email"/>
							</FormGroup>								
							<Button disabled={!this.state.usernameOrEmail} onClick={this.toggle} className="w-25 " type="submit" >Submit</Button>						
							<Link to="/login"><Button className="w-25 m4 pull-right">Back</Button></Link>
		               		<Fade in={this.state.fadeIn} tag="h5" className="mt-3">
			                    Password reset sent. Check your mail.
			                </Fade>							
						</Form>	
					</Col>										
				</Row>	
			</div>		
		)
	}
}

const mappDispatchToProps = dispatch => {
	return ({
		passwordReset: (usernameOrEmail)=> {
			dispatch(passwordReset(usernameOrEmail))
		}
	})
}

const ResetPasswordConnected = withRouter(connect(
	null,
	mappDispatchToProps
)(ResetPassword))

export {ResetPasswordConnected as ResetPassword}
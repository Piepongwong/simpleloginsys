import React, {Component} from 'react';
import Sidebar from "./Sidebar"
import "./style.css"
import {Header} from "./Header"
import User from "./User"
import {Route} from "react-router-dom"

class Profile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div className="app-body">
				<Header />
				<Sidebar>
				</Sidebar>
				<Route path="/profile/user" component={User}/>			
			</div>
		)
	}
}

export default Profile
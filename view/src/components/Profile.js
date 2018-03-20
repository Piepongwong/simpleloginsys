import React from 'react';
import Sidebar from "./Sidebar"
import "./style.css"
import {Header} from "./Header"
import User from "./User"
import {Route} from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';

const Profile = ()=>
	(
		<div className="app-body">
			<Header />
			<Sidebar>
			</Sidebar>
			<Route path="/profile/user" component={User}/>			
		</div>
	)
	

export default Profile
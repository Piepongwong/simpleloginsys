import React from 'react';
import Sidebar from "./Sidebar"
import "./style.css"
import {Header} from "./Header"
import User from "./User"
import {Route} from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';
import {AppStats} from "./AppStats"
import {FancyGraph} from "./FancyGraph"
const Profile = ()=>
	(
		<div className="app-body">
			<Header />
			<Sidebar />
			<Route path="/profile/user" component={User}/>		
			<Route path="/profile/appstats" component={AppStats}/>			
			<Route path="/profile/fancygraph" component={FancyGraph}/>			
		</div>
	)
	
export default Profile
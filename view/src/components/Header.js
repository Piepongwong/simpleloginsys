import React, {Component} from 'react';
import {logout} from "../actions/root"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.state = {
      dropdownOpen: false,
      collapse: false
    };
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggleSidebar() {
    document.body.classList.toggle('sidebar-hidden');
  }

  render() {
    return (
      <header>
        <div onClick={this.toggleSidebar} className="btn btn-default"><a><i className="fa fa-bars fa-2x" style={{color: "white", margin: "2%, flex"}}></i></a></div>
        <div onClick={this.props.logout}className="btn btn-default" style={{color: "white", padding: "2%"}}><i style={{color: "white", "marginRight": "4%"}} className="fa fa-lock fa-2x"></i>Logout</div>
      </header>
    );
  }
}


const mappDispatchToProps = dispatch => {
  return ({
    logout: ()=> {
      dispatch(logout())
    }

  })
}

const mapStateToProps = state => {
  return {
    username: state.session.username,
    lastname: state.session.firstname
  }
}

const HeaderConnected = withRouter(connect(
  mapStateToProps,
  mappDispatchToProps
)(Header))


export {HeaderConnected as Header}
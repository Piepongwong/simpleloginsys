import React, {Component} from 'react';
import {Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Button} from 'reactstrap';
import classNames from 'classnames';
import {Link} from "react-router-dom"

class Sidebar extends Component {  
  constructor(props) {
    super(props);

  }

  render() {
    let liClasses = classNames({
        "sidebar": true,
        "sidebar-hidden": !this.props.visible
    })
    return (
      <div className={liClasses}>
        <Nav vertical pills>
          <NavItem>
            <NavLink tag={Link} to="/profile/appstats" >Appstats</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile/user">User</NavLink>
          </NavItem>          
          <NavItem>
            <NavLink tag={Link} to="/profile/fancygraph">Fancy graph</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Sidebar
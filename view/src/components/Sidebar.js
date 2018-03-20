import React, {Component} from 'react';
import {Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Button} from 'reactstrap';
import classNames from 'classnames';
import {Link} from "react-router-dom"

class Sidebar extends Component {  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
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

  render() {
    let liClasses = classNames({
        "sidebar": true,
        "sidebar-hidden": !this.props.visible
    })
    return (
      <div className={liClasses}>
        <Nav vertical pills>
          <NavItem>
            <NavLink href="/profile" >Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile/user">User</NavLink>
          </NavItem>          
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        <Button color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
            <NavItem>
              <Link to="/profile/user">Link</Link>
            </NavItem>
            <NavItem>
              <Link to="#">Link</Link>
            </NavItem>                            
          </Collapse>  
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>

        </Nav>
      </div>
    );
  }
}

export default Sidebar
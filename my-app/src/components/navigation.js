import React from "react";
import '../styles/navigation.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

class Navigation extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className="navbar-default">
          <NavbarBrand href="/">Abode</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* About Page */}
              <NavItem>
                <NavLink href="/advanced/">Advanced Search</NavLink>
              </NavItem>

              {/* Git Repo Link */}
              <NavItem>
                <NavLink href="https://github.com/arnavjagasia/CIS550Project">
                  GitHub Repo
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

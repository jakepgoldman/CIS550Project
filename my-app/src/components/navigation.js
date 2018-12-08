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
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.renderAdvancedLink = this.renderAdvancedLink.bind(this);
    this.renderGitRepoLink = this.renderGitRepoLink.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderAdvancedLink() {
    return(
      <NavItem>
        <NavLink href="/advanced/">Advanced Search</NavLink>
      </NavItem>
    )
  }

  renderGitRepoLink() {
    return(
      <NavItem>
        <NavLink href="https://github.com/arnavjagasia/CIS550Project">
          Documentation
        </NavLink>
      </NavItem>
    )
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className="navbar-default">
          <NavbarBrand href="/">Abode</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderAdvancedLink()}
              {this.renderGitRepoLink()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

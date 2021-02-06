import React from "react";
import { Button, Nav, NavDropdown, Form, Navbar, FormControl } from "react-bootstrap";

import API from "../../utils/API";

export class Dashboard extends React.Component {
  state = {
    username : localStorage.getItem("username")
  }
   
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    return (
      <div className="">
        <Navbar collapseOnSelect expand="lg" className="topNavBar" variant="dark">
          <Navbar.Brand href="#home">FruitMark</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title={this.state.username } id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={this.disconnect} >Se déconnecter</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
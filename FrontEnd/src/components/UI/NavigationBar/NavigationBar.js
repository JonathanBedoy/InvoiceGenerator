import React, { useEffect } from "react";
// import styles from './NavigationBar.modules.css';
import { Link, withRouter } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Logo from "../../../assets/logo.png";
// import Logo from "../../../assets/JBLogo1.png";
import NavLink from "./NavLink/NavLink";

import { useSelector } from "react-redux";

// import NavDropdown from 'react-bootstrap/NavDropdown'

const NavigationBar = (props) => {
  const breakpoint = useSelector((state) => state.breakpoint);
  const closeNavOnMobile = () => {
    // let element = 
    if(document.getElementById("basic-navbar-nav").classList.contains('show')) {
      document.getElementById("navBarToggleBtn").click();
    }
    
    
  };
  useEffect(() => {
    // console.log(props.location.pathname)
    if ((breakpoint.xs || breakpoint.sm) && props.location.pathname !== '/') {
      closeNavOnMobile()
    }
  }, [props.location.pathname, breakpoint.xs, breakpoint.sm]);

  return (
    <Navbar collapseOnSelect bg="light" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            width="118"
            height="49"
            className="d-inline-block align-top"
            alt="On Site Fasteners Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle id="navBarToggleBtn" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/invoice">Invoice</NavLink>
            <NavLink to="/seller">Sellers</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavigationBar);

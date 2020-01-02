import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #f0f0f0;
  }

  .navbar-brand,
  .navbar-nav,
  .nav-link,
  .nav-item {
    color: #0f0f0f
    &:hover {
      color: white;
    }
  }
`;

const NavBar = () => {
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="">
          <Nav.Link href="/">Geograph</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">About</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default NavBar;

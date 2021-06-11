import React from "react";
import logo from "../logo.png";

import {
  Container,
  Navbar,
  NavbarBrand,
} from "reactstrap";

const Header = () => (
  <header>
    <Container fluid>
      <Navbar color="light" light expand="xs"
      className="border-bottom border-gray bg-white"
      >
        <NavbarBrand
          className="d-inline-block p-0"
          href="/"
          
        >
          <img src={logo} alt="logo" style={{ width: 180 }} className="img-fluid" />
        </NavbarBrand>
      </Navbar>
    </Container>
  </header>
);

export default Header;

import * as React from "react";

import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from "reactstrap";

import * as act from "./../store/actions";
import { CardsContainer } from "./smart/cards";

export default class Layout extends React.Component<Pick<any, never>> {

  render() {
    return (
      [
        <Navbar color="dark" dark expand="md" key="nav">
            <NavbarBrand href="/" className="mr-auto">pipedrive</NavbarBrand>
            <Collapse isOpen={false} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="https://github.com/alexkonovalov">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>,
        <CardsContainer key="cont">
        </CardsContainer>
      ]
    );
  }
}

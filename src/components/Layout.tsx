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
import { Cards, SFCCounterConnectedVerbose } from "./Cards";

export default class Layout extends React.Component<Pick<any, never>> {

  state : { title : string, collapsed: boolean };

  constructor() {
    super({});
     this.state = {
      title: "Welcome",
      collapsed: true
    };
  }

  changeTitle(title: string) {
    this.setState({title});
  }

  toggleNavbar() {
    this.state.collapsed = !this.state.collapsed;
  }

  render() {
    return (
      [<Navbar color="dark" inverse expand="md" key="1">
          <NavbarBrand href="/" className="mr-auto">pipedrive</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
          <Collapse isOpen={false} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="https://github.com/alexkonovalov">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>,
      <SFCCounterConnectedVerbose>
      </SFCCounterConnectedVerbose>
      ]
    );
  }
}

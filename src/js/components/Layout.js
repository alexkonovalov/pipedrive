import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Cards from "./Cards";
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
  DropdownItem } from 'reactstrap';

@connect(store => ({store}))
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      collapsed: true
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  toggleNavbar() {
    this.state.collapsed = !this.state.collapsed;
  }

  render() {
    console.log("Layout.props:", this.props);
    return (
      [<Navbar color="dark" inverse expand="md">
          <NavbarBrand href="/" className="mr-auto">pipedrive</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="https://github.com/alexkonovalov">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>,

      <div class="container-fluid">
        <div>
          <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
          <Cards />
          <Footer />
        </div>
      </div>]
    );
  }
}

import React from "react";
import { connect } from "react-redux";
import Title from "./Header/Title";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button } from 'reactstrap';

import { fetchPersons } from "../actions"
//@connect(store => ({store}))
@connect(store => {
  return { cards: store.cards }
})
export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  fetchCards() {
    this.props.dispatch(fetchPersons());
  }

  render() {
    return (
      <div>
        <Title title={this.props.title} />
        <Button color="danger" onClick={this.fetchCards.bind(this)}>Danger!</Button>
        <ListGroup><ListGroupItem color="info">ewfe</ListGroupItem></ListGroup>
        <input value={this.props.title} readOnly />
      </div>
    );
  }
}

import React from "react";
import { connect } from "react-redux";
import { Card, CardImg, CardDeck, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


@connect(store => ({cards: store.cards}))
export default class Cards extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {name: "Will", modal: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    console.log("CardsComponent.props", this.props);
    var list = [
        <div>
          {[...(this.props.cards || [])
            .map(card => 
              <CardDeck class="mt-2" >
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="8">
                      <CardTitle>{card.name}</CardTitle>
                      <CardSubtitle>{card.company}</CardSubtitle>
                    </Col>
                    <Col xs="4">
                      <CardImg top width="100%" src={card.photo} alt="Card image cap" />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardDeck >
            )
          ]
          }
        </div>
    ];
  
    const ava = "abla";
    return (
      <footer> Foo Barski!! {ava} {this.name}
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <div>{ list }</div>
      </footer>
    );
  }
}

import React from "react";
import { connect } from "react-redux";
import { openModal, closeModal, moveCard } from "../actions";
import { Card, CardImg, CardDeck, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


@connect(store => ({cards: store.cards, modal: store.isModalOpen, modalContent: store.selectedUserData }))
export default class Cards extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {name: "Will", modal: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle = (card, company)  => () => {
    this.props.dispatch(openModal(card, company));

/*     this.setState({
      modal: !this.state.modal
    }); */
  }

  moveCard = (cardKey, newCardKey) => () => {
    this.props.dispatch(moveCard(cardKey, newCardKey));
  }

  close = () => {
    this.props.dispatch(closeModal());    
  }

  render() {

    console.log("CardsComponent.props", this.props);
    var list = [...(this.props.cards || [])
            .map(card => 
              <CardDeck class="mt-2" key={card.key}>
              <Card key={card.key}>
                <CardBody>
                  <Row>
                    <Col xs="8">
                      <CardTitle>{card.name}[{card.key}]</CardTitle>
                      <CardSubtitle>{card.company} <Button color="danger" onClick={this.toggle(card.name, card.company)}>open</Button></CardSubtitle>
                    </Col>
                    <Col xs="4">
                      <CardImg top width="100%" src={card.photo} alt="Card image cap" />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardDeck >
            )
          ];
  
    const ava = "abla";
    return (
      <footer> Foo Barski!! {ava} {this.name}
        { JSON.stringify(this.props.modalContent) }
        <div><Button color="primary">Move Cards</Button></div>
        <Modal isOpen={this.props.modal} toggle={this.close} className={this.props.className}>
          <ModalHeader toggle={this.close}>{ this.props.modalContent && JSON.stringify(this.props.modalContent) }</ModalHeader>
          <ModalBody>
           { this.props.modalContent && JSON.stringify(this.props.modalContent.company) }
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Do Something</Button>{' '}
            <Button color="secondary" onClick={this.close}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <div>{ list }</div>
      </footer>
    );
  }
}

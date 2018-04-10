import * as React from "react";
import { bindActionCreators } from "redux";
import { connect  } from "react-redux";
import { openModal, closeModal, moveCard, fetchPersons } from "../actions";
import { Card, CardImg, CardDeck, CardText, CardBody, Jumbotron,
  CardTitle, CardSubtitle, Button, Row, Col, Container } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const mapStateToProps = (store: any) => {
    return {
       cards: store.cards,
       modal: store.isModalOpen,
       modalContent: store.selectedUserData
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
     openModal,
     closeModal,
     moveCard,
     fetchPersons
    }, dispatch);
};

export const Cards : React.SFC<any> = (props) => {

  const { cards, modalContent, className, modal, openModal, closeModal, moveCard, fetchPersons } = props;

  const toggle = (card: any, company: any)  => () => {
    openModal(card, company);
  };

  const moveCard2 = (cardKey : any, newCardKey : any) => () => {
    moveCard(cardKey, newCardKey);
  };

  const close = () => {
    closeModal();
  };

  const preventDefault = (event: any) => event.preventDefault();

  const drop = (onDropCardKey : any) => (event : any) => {
    event.preventDefault();
    var draggedCardKey = event.dataTransfer.getData("key");
    moveCard(draggedCardKey, onDropCardKey);
  };

  const dragStart = (card: any) => (event: any) => {
    event.dataTransfer.setData("key", card);
  };

    var list = [...(cards || [])
            .map((card: any) =>
              <CardDeck className="mt-2" key={card.key}
                onDragOver={preventDefault}
                onDrop={drop(card.key)}
                >
              <Card key={card.key} className="draggable-card" draggable={true}
                onDragStart={dragStart(card.key)}>
                <CardBody>
                  <Row>
                    <Col xs="8">
                      <CardTitle>{card.name}[{card.key}]</CardTitle>
                      <CardSubtitle>{card.company} <Button color="danger" onClick={toggle(card.name, card.company)}>
                      open</Button></CardSubtitle>
                    </Col>
                    <Col xs="4">
                      <CardImg top width="100%" src={card.photo} alt="Card image cap"
                      className="rounded-circle" />
                    </Col>
                  </Row>
                </CardBody></Card>
            </CardDeck>
            )
          ];

    const ava = "abla";
    return (
      <div>
        <Jumbotron className="jumbotron-short">
          <Container><h3>Bootstrap Tutorial</h3></Container>
        </Jumbotron>
        <Modal isOpen={ modal } toggle={close} className={className}>
          <ModalHeader toggle={close}>{ modalContent && JSON.stringify(modalContent) }</ModalHeader>
          <ModalBody>
           { modalContent && JSON.stringify(modalContent.company) }
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Do Something</Button>
            <Button color="secondary" onClick={close}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="container">{ list }</div>
        </div>
    );
};

export const SFCCounterConnectedVerbose =
connect(mapStateToProps, mapDispatchToProps)(Cards);
import * as React from "react";
import { bindActionCreators, ActionCreatorsMapObject } from "redux";
import { connect  } from "react-redux";
import { Actions, ActionCreators, fetchPersons, EffectActions } from "../store/actions";
import { State, PersonCard } from "../store/model";
import { Card, CardImg, CardDeck, CardText, CardBody, Jumbotron,
  CardTitle, CardSubtitle, Button, Row, Col, Container } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PersonCard as CardComponent } from "./Card";

const mapSubState = (store: State) => ({
       cards: store.cards,
       modal: store.isModalOpen,
       modalContent: store.selectedUserData
    });

const mapDispatchToProps = (dispatch: any) => bindActionCreators(Actions, dispatch);

export const Cards : React.SFC<ReturnType<typeof mapSubState> & typeof Actions> = (props) => {

  const { openModal, closeModal, moveCard, fetchPersons, cards, modal, modalContent } = props;
  
  const toggle = (card: PersonCard)  => () => {
    openModal(card);
  };

  const close = () => {
    closeModal();
  };

  const preventDefault = (event: any) => event.preventDefault();

  const drop = (onDropCardKey : any) => (event : any) => {
    event.preventDefault();
    console.log("onDropCardKey:::::", onDropCardKey);
    var draggedCardKey = event.dataTransfer.getData("key");
    moveCard({ cardKey: draggedCardKey, newPositionKey: onDropCardKey });
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
                      <CardTitle>{card.name}</CardTitle>
                      <CardSubtitle>{card.company} <Button color="danger" onClick={toggle(card)}>
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
          <Container><h3>Person Information</h3></Container>
        </Jumbotron>
        <CardComponent key={"vasily"} name={"vas"} company={"sfsdf"} photo={"sdfsdf"}/>
        <Modal isOpen={ modal && !!modalContent } toggle={close} className={"foo"}>
          <ModalHeader toggle={close}>Person Information</ModalHeader>
          <ModalBody>
            <Container>
              <Row className="d-flex justify-content-center">
                  <CardImg src={modalContent && modalContent.photo} alt="Card image cap"
                      className="rounded-circle" />
              </Row>
              <Row className="d-flex justify-content-center">
                <h5>{ modalContent && modalContent.name }</h5>
              </Row>
              <Row className="d-flex justify-content-center">
                <span className="text-success">{modalContent && modalContent.phone}</span>
              </Row>
              <hr/>
              <Row><Col xs="4"><h5 className="float-right">Email</h5></Col><Col xs="8"><div>{modalContent && modalContent.email}</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Organisation</h5></Col><Col xs="8">
              <div>{modalContent && modalContent.company}</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Assistant</h5></Col><Col xs="8"><div>-</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Groups</h5></Col><Col xs="8"><div>-</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Location</h5></Col><Col xs="8">
              <div>-</div></Col></Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={close}>Back</Button>
          </ModalFooter>
        </Modal>
        <div className="container">{ list }</div>
        </div>
    );
};

export const SFCCounterConnectedVerbose =
connect(mapSubState, mapDispatchToProps)(Cards);
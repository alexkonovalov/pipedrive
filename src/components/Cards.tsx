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

const CardsComponent : React.SFC<ReturnType<typeof mapSubState> & typeof Actions> = (props) => {
  const { openModal, closeModal, moveCard, fetchPersons, cards, modal, modalContent } = props;

  const cardClicked = (cardKey: string) => {
    const card = cards
      .filter(card => card.key === cardKey)[0];

    card ? openModal(card) : () => { throw new Error("Card Is Not Found") };
  };

  const close = () => {
    closeModal();
  };

  const cardDropped = (onDropCardKey : string, event : any) => {
    var draggedCardKey = event.dataTransfer.getData("key");
    moveCard({ cardKey: draggedCardKey, newPositionKey: onDropCardKey });
  };

  const cardDragged = (key: string, event: any) => {
    event.dataTransfer.setData("key", key);
  };

    var list = [...(cards || [])
            .map((card: any) =>
                <CardComponent
                    key={card.key}
                    personKey={card.key}
                    name={card.name}
                    company={card.company}
                    photo={card.photo}
                    onDrag={cardDragged}
                    onDrop={cardDropped}
                    onClick={cardClicked}
                />
            )
          ];

    return (
      <div>
        <Jumbotron className="jumbotron-short">
          <Container><h3>Person Information</h3></Container>
        </Jumbotron>
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

export const CardsContainer = connect(mapSubState, mapDispatchToProps)(CardsComponent);
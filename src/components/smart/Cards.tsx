import * as React from "react";
import { bindActionCreators, ActionCreatorsMapObject } from "redux";
import { connect  } from "react-redux";
import { Actions, ActionCreators, fetchPersons, EffectActions } from "../../store/actions";
import { State, PersonCard } from "../../store/model";
import { Card, CardImg, CardDeck, CardText, CardBody, Jumbotron,
  CardTitle, CardSubtitle, Button, Row, Col, Container } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PersonCard as CardComponent } from "../dumb/Card";
import { PersonModal as ModalComponent } from "../dumb/Modal";

import "./cards.scss";

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
        <ModalComponent modalContent={modalContent} isOpen={modal} onCloseClick={closeModal}></ModalComponent>
        <div className="container">{ list }</div>
        </div>
    );
};

export const CardsContainer = connect(mapSubState, mapDispatchToProps)(CardsComponent);
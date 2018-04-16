import * as React from "react";
import { Jumbotron, Container } from "reactstrap";
import { bindActionCreators, ActionCreatorsMapObject, Dispatch } from "redux";
import { connect  } from "react-redux";

import { Actions, ActionCreators, EffectActions } from "../../store/actions";
import { State, PersonCard } from "../../core/model";
import { PersonCardComponent } from "../dumb/personCard";
import { PersonModalComponent } from "../dumb/personModal";

import "./cards.scss";

const mapSubState = (store: State) => ({
       cards: store.cards,
       modal: store.isModalOpen,
       modalContent: store.selectedUserData
    });

const mapDispatchToProps = (dispatch: Dispatch<State>) => bindActionCreators(Actions, dispatch);

const CardsComponent : React.SFC<ReturnType<typeof mapSubState> & typeof Actions> = (props) => {
  const { openModal, closeModal, moveCard, fetchPersons, cards, modal, modalContent } = props;

  const cardClicked = (cardKey: string) => {
    const card = cards
      .filter(card => card.key === cardKey)[0];
    card && openModal(card);
  };

  const cardDropped = (onDropCardKey : string, event : React.DragEvent<HTMLElement>) => {
    var draggedCardKey = event.dataTransfer.getData("key");
    moveCard({ cardKey: draggedCardKey, newPositionKey: onDropCardKey });
  };

  const cardDragged = (key: string, event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.setData("key", key);
  };

  return (
    <div>
      <Jumbotron className="jumbotron-short">
        <Container><h3>Person Information</h3></Container>
      </Jumbotron>
      <PersonModalComponent modalContent={modalContent} isOpen={modal} onCloseClick={closeModal}></PersonModalComponent>
      <div className="container">{
        [...(cards || [])
          .map((card: PersonCard) =>
              <PersonCardComponent
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
        ]
      }</div>
    </div>
  );
};

export const CardsContainer = connect(mapSubState, mapDispatchToProps)(CardsComponent);
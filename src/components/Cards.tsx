import * as React from "react";
import { bindActionCreators, ActionCreatorsMapObject } from "redux";
import { connect  } from "react-redux";
import { Actions, fetchPersons  } from "../store/actions";
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

var s = Actions.closeModal

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({...Actions, fetchPersons }, dispatch);
};

interface CardsProps {
  moveCard: typeof Actions.moveCard,
  openModal: typeof Actions.openModal,
  closeModal: typeof Actions.closeModal,
  fetchPersons: typeof fetchPersons
}

export const Cards : React.SFC<any | CardsProps> = (props) => {

  const { cards, modalContent, className, modal, openModal, closeModal, moveCard, fetchPersons } = props;

  const toggle = (card: any, company: any, image: any)  => () => {
    openModal(card, company, image);
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
                      <CardTitle>{card.name}[{card.key}]</CardTitle>
                      <CardSubtitle>{card.company} <Button color="danger" onClick={toggle(card.name, card.company, card.photo)}>
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
        <Modal isOpen={ modal && modalContent } toggle={close} className={className}>
          <ModalHeader toggle={close}>Person Information</ModalHeader>
          <ModalBody>
            <Container>
              <Row className="d-flex justify-content-center">
                  <CardImg src={modalContent && modalContent.image} alt="Card image cap"
                      className="rounded-circle" />
              </Row>
              <Row className="d-flex justify-content-center">
                <h5>{ modalContent && modalContent.name }</h5>
              </Row>
              <Row className="d-flex justify-content-center">
                <span className="text-success">+12313123123</span>
              </Row>
              <hr/>
              <Row><Col xs="4"><h5 className="float-right">Email</h5></Col><Col xs="8"><div>olgsa@gs.com</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Organisation</h5></Col><Col xs="8">
              <div>{modalContent && modalContent.company}</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Assistant</h5></Col><Col xs="8"><div>olgsa@gs.com</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Groups</h5></Col><Col xs="8"><div>olgsa@gs.com</div></Col></Row>
              <Row><Col xs="4"><h5 className="float-right">Location</h5></Col><Col xs="8">
              <div>Gothenberg</div></Col></Row>
            </Container>
          {/*  modalContent && JSON.stringify(modalContent)  */}
           {/*  modalContent && JSON.stringify(modalContent.company)  */}
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
connect(mapStateToProps, mapDispatchToProps)(Cards);
import * as React from "react";
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  CardImg,
  Button,
  Row,
  Col
} from "reactstrap";

import { PersonCard } from "../../core/model"

interface ModalProps {
  modalContent: PersonCard,
  isOpen: boolean
} 

interface ModalEvents {
  onCloseClick: () => void
}

export const PersonModalComponent : React.SFC<ModalProps & ModalEvents> = (props) => { 

  const close = () => {
    props.onCloseClick();
  }

  return (
      !props.modalContent
      ? null 
      : <Modal isOpen={ props.isOpen } toggle={close}>
          <ModalHeader toggle={close}>Person Information</ModalHeader>
          <ModalBody>
            <Container>
              <Row className="d-flex justify-content-center">
                  <CardImg src={ props.modalContent.photo} alt="Card image cap"
                      className="rounded-circle" />
              </Row>
              <Row className="d-flex justify-content-center">
                <h5>{ props.modalContent.name }</h5>
              </Row>
              <Row className="d-flex justify-content-center">
                <span className="text-success">{ props.modalContent.phone}</span>
              </Row>
              <hr/>
              <Row>
                <Col xs="4"><h5 className="float-right">Email</h5></Col>
                <Col xs="8"><div>{props.modalContent.email}</div></Col>
              </Row>
              <Row>
                <Col xs="4"><h5 className="float-right">Organisation</h5></Col>
                <Col xs="8"><div>{ props.modalContent.company}</div></Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={close}>Back</Button>
          </ModalFooter>
        </Modal>
  );
}
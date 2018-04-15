import * as React from "react";
import { 
  Card,
  CardImg,
  CardDeck,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";

import "./Card.scss";

interface CardProps {
  personKey: string,
  name: string,
  company: string,
  photo: string
} 

interface CardEvents {
  onDrop?: (key: string, event: React.DragEvent<HTMLElement>) => void,
  onDrag?: (key: string, event: React.DragEvent<HTMLElement>) => void,
  onClick?: (key: string) => void
}


export const PersonCard : React.SFC<CardProps & CardEvents> = (props) => { 

  const preventDefaultIfNeeded = (event: React.DragEvent<HTMLElement>) => props.onDrag ? event.preventDefault() : event;

  const drop = (key: string) => { 
    return (event: React.DragEvent<HTMLElement>) => {
      if (props.onDrop) {
        event.preventDefault();
        props.onDrop(key, event);
      }
    }
  };

  const drag = (key: string) => { 
    return (event: React.DragEvent<HTMLElement>) => {
      props.onDrag && props.onDrag(key, event)
    }
  };

  const click = (key: string) => () => {
    props.onClick(key);
  }

  return (
    <CardDeck className="mt-2" key={props.personKey} onDrop={drop(props.personKey)}>
      <Card key={props.personKey} className="draggable-card" draggable={true}
        onDragStart={drag(props.personKey)} onDragOver={preventDefaultIfNeeded}>
        <CardBody>
          <Row>
            <Col xs="8">
              <CardTitle>{props.name}</CardTitle>
              <CardSubtitle>{props.company} <Button color="danger" onClick={click(props.personKey)}>
              open</Button ></CardSubtitle>
            </Col>
            <Col xs="4">
              <CardImg top width="100%" src={props.photo} alt="Card image cap"
              className="rounded-circle" />
            </Col>
          </Row>
        </CardBody></Card>
    </CardDeck>
  );
}
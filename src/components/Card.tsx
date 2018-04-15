import * as React from "react";
import { Card, CardImg, CardDeck, CardText, CardBody, Jumbotron,
  CardTitle, CardSubtitle, Button, Row, Col, Container } from "reactstrap";

interface CardProps {
  key: string,
  name: string,
  company: string,
  photo: string
} 

interface CardEvents {
  onsItemDrop?: (key : any) => {},
  onDsagStart?: (key: any) => {}
}

export const PersonCard : React.SFC<CardProps & CardEvents> = (props) => { 

  const drop = (key: any) => () => props.onsItemDrop || props.onsItemDrop(key);
  const drag = (key: any) => () => props.onsItemDrop || props.onDsagStart(key);

  return (
    <CardDeck className="mt-2" key={props.key} onDrop={drop(props.key)}>
      <Card key={props.key} className="draggable-card" draggable={true}
        onDragStart={drag(props.key)}>
        <CardBody>
          <Row>
            <Col xs="8">
              <CardTitle>{props.name}</CardTitle>
              <CardSubtitle>{props.company} <Button color="danger">
              open</Button></CardSubtitle>
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
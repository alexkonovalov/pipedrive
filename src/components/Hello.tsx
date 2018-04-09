import * as React from "react";
import { Button } from "reactstrap";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

export interface HelloProps { compiler: string; framework: string; }


// 'HelloProps' describes the shape of props.
// state is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1><Button>Pipedrive</Button> froggm {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
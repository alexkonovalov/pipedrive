import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import { Actions } from "./store/actions";
import Layout from "./components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";


store.dispatch(Actions.fetchPersons());

ReactDOM.render(
  <Provider store={store} ><Layout /></Provider>,
    document.getElementById("example")
);
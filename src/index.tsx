import * as React from "react";
import * as ReactDOM from "react-dom";

import store from "./store/store"
import Layout from "./components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./components/cards.scss";

import { Provider } from "react-redux";



ReactDOM.render(
  <Provider store={store} ><Layout /></Provider>,
    document.getElementById("example")
);
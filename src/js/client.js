import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout";


import { createStore, applyMiddleware } from "redux";

const logger = (store) => (next) => (action) => {
  console.log("actionka:", action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log("error caputerd", e);
  }
}

const middleware = applyMiddleware(thunk, logger, error);

const store = createStore(reducer, {cards: []}, middleware);
Window.store = store;

store.subscribe(() => {
  console.log("store changed", store.getState());
})

function reducer(state = {cards: []}, action) {
  switch (action.type){
    case ("add") : {
      return {...state, cards: [...state.cards, action.payload]};
    }
    case ("error") : {
      throw new Error();
      return state;
    }
  }
}

const addCard = (name, company, photo) => {
  store.dispatch({
    type: "add",
    payload: { name, company, photo }
  })
}

addCard("olga", "pipedrive", "olga.jpg")
addCard("hendrik", "planet os", "hendrik.jpg")
addCard("reili", "evolution gaming", "reili.jpg")
addCard("kaido", "pipedrive", "kaido.jpg")
addCard("maksim", "betsson", "maksimo.jpg")

setTimeout(() => {
  addCard("ivan", "pipedrive", "ivan.jpg");
}, 4000)

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><Layout/></Provider>, app);

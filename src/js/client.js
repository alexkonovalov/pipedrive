
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import './components/cards.scss';
import Layout from "./components/Layout";


import { createStore, applyMiddleware } from "redux";

const logger = (store) => (next) => (action) => {
  console.log("action passed:", action);
  console.log("new store:", store);
  
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

const store = createStore(reducer, {cards: [], isModalOpen: false }, middleware);
Window.store = store;

store.subscribe(() => {
  console.log("store changed", store.getState());
})

function reducer(state = {cards: []}, action) {
  switch (action.type){
    case ("add") : {
      return {...state, cards: [...state.cards, action.payload]};
    }
    case ("moveCard") : {
        return {...state, 
          cards: state.cards
            .reduce((acc, curr) => 
              curr.key === action.payload.newPositionKey
                ? [...acc, 
                    state.cards
                      .find(card => card.key === action.payload.cardKey) || (() => { throw new Error("no such card")}),
                  curr
                ]
                : curr.key === action.payload.cardKey
                  ? acc
                  : [...acc, curr]
            , [])
          };
    }
    case ("openModal") : {
      return {...state, selectedUserData: {
        name: action.payload.name,
        company: action.payload.company 
      },
      isModalOpen: true
    };
    }
    case ("closeModal") : {
      return {...state,
       isModalOpen: false
      };
    }
    case ("error") : {
      throw new Error();
      return state;
    }
    default: return state;
  }
}

const addCard = (name, company, photo, key) => {
  store.dispatch({
    type: "add",
    payload: { name, company, photo, key }
  })
}

addCard("olga", "pipedrive", "olga.jpg", "olg")
addCard("hendrik", "planet os", "hendrik.jpg", "hen")
addCard("reili", "evolution gaming", "reili.jpg", "rei")
addCard("kaido", "pipedrive", "kaido.jpg", "kai")
addCard("maksim", "betsson", "maksimo.jpg", "mak")

setTimeout(() => {
  addCard("ivan", "pipedrive", "ivan.jpg", "iva");
}, 4000)

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><Layout/></Provider>, app);

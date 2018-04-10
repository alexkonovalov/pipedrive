import * as React from "react";
import * as ReactDOM from "react-dom";
import thunk from "redux-thunk";
import Layout from "./components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./components/cards.scss";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const logger = (store :any) => (next : any) => (action : any) => {
  console.log("action passed:", action);
  console.log("new store:", store);

  next(action);
};

const error = (store : any) => (next : any) => (action :any) => {
  try {
    next(action);
  } catch (e) {
    console.log("error caputerd", e);
  }
};

const middleware = applyMiddleware(thunk, logger, error);

const store = createStore(reducer, {cards: [], isModalOpen: false }, middleware);

(Window as {[store: string]: any}).store = store;

store.subscribe(() => {
  console.log("store changed", store.getState());
});

function reducer(state :any = {cards: []}, action: any) {
  switch (action.type) {
    case ("add") : {
      return {...state, cards: [...state.cards, action.payload]};
    }
    case ("moveCard") : {
        return {...state,
          cards: state.cards
            .reduce((acc : any, curr: any) =>
              curr.key === action.payload.newPositionKey
                ? [...acc,
                    state.cards
                      .find((card : any) => card.key === action.payload.cardKey) || (() => { throw new Error("no such card")}),
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
    }
    default: return state;
  }
}

const addCard = (name : any, company : any, photo : any, key : any) => {
  store.dispatch({
    type: "add",
    payload: { name, company, photo, key }
  });
};

addCard("olga", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "olg");
addCard("hendrik", "planet os", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "hen");
addCard("reili", "evolution gaming",
"https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "rei");
addCard("kaido", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "kai");
addCard("maksim", "betsson", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "mak");

setTimeout(() => {
  addCard("ivan", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "iva");
}, 4000);

ReactDOM.render(
  <Provider store={store} ><Layout /></Provider>,
    document.getElementById("example")
);
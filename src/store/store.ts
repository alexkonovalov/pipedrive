import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { PersonCard, State } from "../core/model";
import { reducer } from "./reducer";
import { ReduxActions, Actions } from "./actions";

const logger = (store :any) => (next : any) => (action : any) => {
  console.log("action passed:", action);
  console.log("new store:", store);

  next(action);
};

const error = (store : any) => (next : any) => (action : any) => {
  try {
    next(action);
  } catch (e) {
    console.log("error caputerd", e);
  }
};

const middleware = applyMiddleware(thunk, logger, error);
const store = createStore<State>(reducer, middleware);

store.dispatch(Actions.fetchPersons());

export default store;
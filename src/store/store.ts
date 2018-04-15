import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { PersonCard, State } from "./model";
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

//todo remove adding mock data:
/* const addCard = (name : any, company : any, photo : any, key : any) => {
  store.dispatch(ReduxActions.addCard2({ name, company, photo, key }));
};

addCard("olga", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "olg");
addCard("hendrik", "planet os", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "hen");
addCard("reili", "evolution gaming",
"https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "rei");
addCard("kaido", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "kai");
addCard("maksim", "betsson", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "mak");

setTimeout(() => {
  addCard("ivan", "pipedrive", "https://pipedrive-profile-pics.s3.amazonaws.com/e97fb1487d54067f50c16bf00a56bd59a1cbefab_128.jpg", "iva");
}, 4000); */

export default store;
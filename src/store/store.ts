import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { PersonCard, State } from "../core/model";
import { reducer } from "./reducer";
import { ReduxActions, Actions } from "./actions";

const middleware = applyMiddleware(thunk);
const store = createStore<State>(reducer, middleware);

export default store;
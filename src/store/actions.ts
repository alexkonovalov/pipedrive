import { Dispatch } from "redux";
import pipedriveClient from "../core/client";
import { createAction, ActionsUnion, ActionCreatorsUnion } from "./actions.helpers";
import { State, PersonCard, MoveCardParams } from "../core/model";

export enum ACTION_KEYS {
  ADD_CARD = "add",
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
  MOVE_CARD = "moveCard"
};

export const ReduxActions = {
  addCard : (personCard: PersonCard) => createAction(ACTION_KEYS.ADD_CARD, personCard),
  openModal : (modalData: PersonCard) => createAction(ACTION_KEYS.OPEN_MODAL, modalData),
  closeModal : () => createAction(ACTION_KEYS.CLOSE_MODAL),
  moveCard: (moveCardParams: MoveCardParams) => createAction(ACTION_KEYS.MOVE_CARD, moveCardParams),
};

export const EffectActions = {
  fetchPersons: () => (dispatch: Dispatch<State>) =>
      pipedriveClient
        .fetchPersonsCards()
        .then((personCards: PersonCard[]) => {
          personCards
            .map((personCard :PersonCard)=> dispatch(ReduxActions.addCard(personCard))) 
            //todo consider adding bulk add for perf improvements
      })
};

export const Actions = {
  ...ReduxActions, ...EffectActions
};

export type ReduxActions = ActionsUnion<typeof ReduxActions>
export type Actions = ActionsUnion<typeof Actions>
export type ActionCreators = ActionCreatorsUnion<typeof Actions>
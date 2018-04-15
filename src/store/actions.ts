import axios from "axios";

const API_TOKEN = "7f25987743073b4b01a01f14726aa27aa01d4228";

import { createAction, ActionsUnion, ActionCreatorsUnion } from "./actions.helpers";
import { PersonCard, MoveCardParams } from "./model";

export enum ACTION_KEYS {
  ADD_CARD = "add",
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
  MOVE_CARD = "moveCard"
}

export const fetchPersons = () => (dispatch: any) =>
    axios.get(`https://api.pipedrive.com/v1/persons?api_token=${API_TOKEN}`)
      .then((response: any) => {
        response
          .data
          .data
          .map((personData: any) => {
            dispatch(
              ReduxActions.addCard2({
                name: personData.name,
                company: personData.org_name,
                photo: personData.picture_id && personData.picture_id.pictures["128"],
                key: `${personData.id}`,
                email: personData.email[0].value,
                phone: personData.phone[0].value
              }));
          });
      })
      .catch((err : any) => {
        console.log("persons rejected", err);
      });

export const ReduxActions = {
  addCard2 : (personCard: PersonCard) => createAction(ACTION_KEYS.ADD_CARD, personCard),
  openModal : (modalData: PersonCard) => createAction(ACTION_KEYS.OPEN_MODAL, modalData),
  closeModal : () => createAction(ACTION_KEYS.CLOSE_MODAL),
  moveCard: (moveCardParams: MoveCardParams) => createAction(ACTION_KEYS.MOVE_CARD, moveCardParams),
}

export const EffectActions = {
  fetchPersons
}

export const Actions = {
  ...ReduxActions, ...EffectActions
}

export type ReduxActions = ActionsUnion<typeof ReduxActions>;
export type Actions = ActionsUnion<typeof Actions>;
export type ActionCreators = ActionCreatorsUnion<typeof Actions>
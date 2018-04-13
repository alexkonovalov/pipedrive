import axios from "axios";

const API_TOKEN = "d04d240a90771762f727215739b19fe5f8dddd5b";

import { createAction, ActionsUnion } from "./actions.helpers";
import { PersonCard, ModalData, MoveCardParams } from "./model";

export enum ACTION_KEYS {
  ADD_CARD = "add",
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
  MOVE_CARD = "moveCard"
}

export const fetchPersons = (dispatch: any) =>
    axios.get(`https://api.pipedrive.com/v1/persons?api_token=${API_TOKEN}`)
      .then((response: any) => {
        response
          .data
          .data
          .map((personData: any) => {
            dispatch(
              Actions.addCard2({
                name: personData.name,
                company: personData.org_name,
                photo: personData.picture_id && personData.picture_id.pictures["128"],
                key: (new Date()).toString()
              }));
          });
      })
      .catch((err : any) => {
        console.log("persons rejected", err);
      });

export const Actions = {
  addCard2 : (personCard: PersonCard) => createAction(ACTION_KEYS.ADD_CARD, personCard),
  openModal : (modalData: ModalData) => createAction(ACTION_KEYS.OPEN_MODAL, modalData),
  closeModal : () => createAction(ACTION_KEYS.CLOSE_MODAL),
  moveCard: (moveCardParams: MoveCardParams) => createAction(ACTION_KEYS.MOVE_CARD, moveCardParams)
}

export type Actions = ActionsUnion<typeof Actions>;
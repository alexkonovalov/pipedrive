import axios from "axios";

const API_TOKEN = "d04d240a90771762f727215739b19fe5f8dddd5b";

import { Action, ActionWithPayload, action } from "./actions.helpers";
import { PersonCard, ModalData, MoveCardParams } from "./model";

export enum ACTION_KEYS {
  ADD_CARD = "add",
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
  MOVE_CARD = "moveCard"
}

export const addCard2 = action<typeof ACTION_KEYS.ADD_CARD, PersonCard>(ACTION_KEYS.ADD_CARD)

export function fetchPersons() {
  return (dispatch: any) =>
    axios.get(`https://api.pipedrive.com/v1/persons?api_token=${API_TOKEN}`)
      .then((response: any) => {
        response
          .data
          .data
          .map((personData: any) => {
            dispatch(
              addCard2({
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
}

export const openModal = action<typeof ACTION_KEYS.OPEN_MODAL, ModalData>(ACTION_KEYS.OPEN_MODAL);
export const closeModal = action<typeof ACTION_KEYS.CLOSE_MODAL>(ACTION_KEYS.CLOSE_MODAL);
export const moveCard = action<typeof ACTION_KEYS.MOVE_CARD, MoveCardParams>(ACTION_KEYS.MOVE_CARD)
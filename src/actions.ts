import axios from "axios";

const API_TOKEN = "d04d240a90771762f727215739b19fe5f8dddd5b";

import { PersonCard } from "./store/model";

export enum ACTION_KEYS {
  ADD_CARD = "add",
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
  MOVE_CARD = "moveCard"
}

export interface AddCardAction {
  type: ACTION_KEYS.ADD_CARD;
  by: PersonCard;
}

export interface ModalData { 
  name: any,
  company: any,
  image: any
}

export interface MoveCardParams {
  cardKey: any,
  newPositionKey: any
}

export interface Action<T extends string> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

type ActionFn<T extends string> = () => Action<T>
type ActionWithPayloadFn<T extends string, P> = (payload: P) => ActionWithPayload<T, P>

function action<T extends string>(type: T): ActionFn<T>
function action<T extends string, P>(type: T): ActionWithPayloadFn<T, P>
function action(type: string) {
  return (payload?: any) => (payload ? { type, payload } : { type })
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

/*   export function openModal(name : any, company: any, image: any) {
    return {
      type: "openModal",
      payload: { name, company, image }
    };
  } */

/*   export function closeModal() {
    return {
      type: "closeModal"
    };
  } */

/*   export function moveCard(cardKey: any, newPositionKey: any) {
    return {
      type: "moveCard",
      payload: {
        cardKey,
        newPositionKey
      }
    }
  } */
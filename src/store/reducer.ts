import { State, PersonCard } from "../core/model";
import { ReduxActions, ACTION_KEYS } from "./actions";

export const initalState: State = {
  cards: [],
  isModalOpen: false
};

export const reducer = (state: State = initalState, action: ReduxActions ) => {
  switch (action.type) {
    case (ACTION_KEYS.ADD_CARD) : {
      return {...state, cards: [...state.cards, action.payload]};
    }
    case (ACTION_KEYS.MOVE_CARD) : {
      const cardKeys = state.cards
        .map((card : PersonCard) => card.key);
        
      const cardIdx = cardKeys.indexOf(action.payload.cardKey);
      const newPositionIdx = cardKeys.indexOf(action.payload.newPositionKey);

      return {...state,
         cards: state.cards
          .reduce((acc : PersonCard[], curr: PersonCard, idx: number) => {
            if (cardIdx === idx) {
              return acc;
            }
            if (idx === newPositionIdx) {
              return newPositionIdx > cardIdx
                ? [...acc, curr, state.cards[cardIdx]]
                : [...acc, state.cards[cardIdx], curr]
            }
            else {
              return [...acc, curr];
            }
          }, [])
        };
    }
    case (ACTION_KEYS.OPEN_MODAL) : {
      return {...state, 
        selectedUserData: action.payload,
        isModalOpen: true
      }
    }
    case (ACTION_KEYS.CLOSE_MODAL) : {
      return {...state,
       isModalOpen: false
      };
    }
    default: return state;
  }
}
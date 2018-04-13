import { State } from "./model";
import { Actions, ACTION_KEYS } from "./actions";

export const initalState: State = {
  cards: [],
  isModalOpen: false
};

export const reducer = (state: State = initalState, action: Actions ) => {
  switch (action.type) {
    case (ACTION_KEYS.ADD_CARD) : {
      return {...state, cards: [...state.cards, action.payload]};
    }
    case (ACTION_KEYS.MOVE_CARD) : {
        return {...state,
          cards: state.cards
            .reduce((acc : any, curr: any) =>
              curr.key === action.payload.newPositionKey
                ? [...acc,
                    state.cards
                      .filter((card : any) => card.key === action.payload.cardKey)[0] || (() => { throw new Error("no such card")}),
                  curr
                ]
                : curr.key === action.payload.cardKey
                  ? acc
                  : [...acc, curr]
            , [])
         };
    }
    case (ACTION_KEYS.OPEN_MODAL) : {
      return {...state, 
        selectedUserData: {
          name: action.payload.name,
          company: action.payload.company,
          image: action.payload.image
        },
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
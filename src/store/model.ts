export class PersonCard {
  name: string;
  company: string;
  photo: string;
  key: string;
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

export class State {
  cards: PersonCard[];
  isModalOpen: boolean;
  selectedUserData?: {
    name: any,
    company: any,
    image: any
  };
}
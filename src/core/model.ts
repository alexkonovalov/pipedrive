export class PersonCard {
  name: string;
  company: string;
  photo: string;
  key: string;
  email: string;
  phone: string;
}

export interface ModalData { 
  name: any,
  company: any,
  image: any,
  email: string,
  photo: string
}
 
export interface MoveCardParams {
  cardKey: any,
  newPositionKey: any
}

export class State {
  cards: PersonCard[];
  isModalOpen: boolean;
  selectedUserData?: PersonCard;
}

export type PersonInfo = {
  name: string,
  company: string,
  org_name: string,
  picture_id: {
    pictures: { [key: string]: string }
  },
  id: string,
  email: { value: string}[],
  phone: { value: string}[]
}

export type PersonInfoResponse = {
  data: {
    data: PersonInfo[]
  }
}
export class PersonCard {
  name: string;
  company: string;
  photo: string;
  key: string;
  email: string;
  phone: string;
}

export interface ModalData { 
  name: string,
  company: string,
  image: string,
  email: string,
  photo: string
}
 
export interface MoveCardParams {
  cardKey: string,
  newPositionKey: string
}

export interface State {
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
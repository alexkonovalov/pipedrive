import axios from "axios";

import { PersonInfoResponse, PersonInfo, PersonCard } from "./model";

const API_TOKEN = "7f25987743073b4b01a01f14726aa27aa01d4228";
const PERSONS_ENDPOINT= "https://api.pipedrive.com/v1/persons";

const pipedriveClient = {
  fetchPersonsCards : () => axios
    .get(`${PERSONS_ENDPOINT}?api_token=${API_TOKEN}`)
    .then((response: PersonInfoResponse) => {
      return response
        .data
        .data
        .map<PersonCard>(personInfo => ({
          name: personInfo.name,
          company: personInfo.org_name,
          photo: personInfo.picture_id && personInfo.picture_id.pictures["128"],
          key: `${personInfo.id}`,
          email: personInfo.email[0].value,
          phone: personInfo.phone[0].value
          })
        )
    })
};

export default pipedriveClient
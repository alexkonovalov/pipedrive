import axios from "axios";

const API_TOKEN = 'd04d240a90771762f727215739b19fe5f8dddd5b'

export function fetchPersons() {
  return dispatch => 
    axios.get(`https://api.pipedrive.com/v1/persons?api_token=${API_TOKEN}`)
      .then(response => {
        response
          .data
          .data
          .map(personData => {
            dispatch({
              type: "add",
              payload: { 
                name: personData.name,
                company: personData.org_name,
                photo: personData.picture_id && personData.picture_id.pictures["128"]
              }
            });
          });
      })
      .catch(err => {
        console.log("persons rejected", err);
      })
  }
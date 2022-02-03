import axios from "axios";
import { ADD_CARRIER } from '../actions/index.js'


const initialState = {
  //hago un estado inicial
  login: null,
  token: "",
  respAddCarrier: null,
};
console.log("ESTO ES EL INITAL STATE", initialState )

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGEO":
      return {
        ...state,
        login: action.payload, //en registrarusuario meteme el action.payload
        token: action.token
      };
    case "ADD_CARRIER":
      return {
        ...state,
        respAddCarrier: action.payload
      }
    default:
      return state;
  }
}

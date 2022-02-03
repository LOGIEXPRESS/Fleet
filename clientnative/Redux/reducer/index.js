import axios from "axios";
import { ADD_CARRIER } from '../actions/index.js'


const initialState = {
  //hago un estado inicial
  login: null,
  token: "",
  respAddCarrier: null,
  responseLog: null,
  respToken: null,
  adminreg: null,
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
      case "TOKEN":
      return {
        ...state,
        respToken: action.payload,
        responseLog: action.payload,
      };
      case "GET_ADMINREG":
      return {
        ...state,
        adminreg: action.payload,
      };
    
    default:
      return state;
  }
}

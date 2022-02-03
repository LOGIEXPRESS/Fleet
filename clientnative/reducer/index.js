import axios from "axios";



const initialState = {
  //hago un estado inicial
  login: null,
  token: "",
  responseLog: null,
  respToken: null,
  adminreg: null,
};


export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGEO":
      return {
        ...state,
        login: action.payload, //en registrarusuario meteme el action.payload
        token: action.token
      };
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

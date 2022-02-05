import axios from "axios";



const initialState = {
  //hago un estado inicial
  login: null,
  token: "",
  respAddCarrier: null,
  responseLog: null,
  respToken: null,
  adminreg: null,
  editPassword: [],
  editarPerfilUser: [],
  editarPerfilCarrier: [],
  editVehicule: [],
  price: []
};
console.log("ESTO ES EL INITAL STATE", initialState )

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGEO":
      return {
        ...state,
        responseLog: action.payload, //en registrarusuario meteme el action.payload
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
      case "DESMOUNT":
        return {
          ...state,
          editPassword: [],
          editarPerfilUser: [],
          editarPerfilCarrier: [],
          editVehicule: [],
          price: []
        };
        case "GET_PRICE_QUOTE":
          return {
            ...state,
            price: action.payload,
          };
          case "COMPLETE_PROFILE_CARRIER":
          return {
            ...state,
            responseLog: action.payload,
          };
    
    default:
      return state;
  }
}

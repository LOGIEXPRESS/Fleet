import axios from "axios";



const initialState = {
  //hago un estado inicial
  logiarUsuario: null,

};


export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGEO":
      return {
        ...state,
        logiarUsuario: action.payload, //en registrarusuario meteme el action.payload
      };
    
    default:
      return state;
  }
}

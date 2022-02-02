import axios from "axios";



const initialState = {
  //hago un estado inicial
  login: null,

};


export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGEO":
      return {
        ...state,
        login: action.payload, //en registrarusuario meteme el action.payload
      };
    
    default:
      return state;
  }
}

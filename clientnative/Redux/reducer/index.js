import axios from "axios";



const initialState = {
  //hago un estado inicial
  login: null,
  token: "",
  respAddCarrier: null,
  responseLog: null,
  respToken: null,
  adminreg: null,
  registeredFleet: null,
  respDeleteUser: null,
  editPassword: [],
  editarPerfilUser: [],
  editarPerfilCarrier: [],
  editVehicule: [],
  price: [],
  travels: [],
  userStatus: null,
  confirmTravel: null,
  respStatus: null,
  userCarrier: null,
  respUpdateAccessToken: null,
  alltraveltruck: null,
  carrierTravels: null
};
console.log("ESTO ES EL INITAL STATE", initialState)

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
    case "REGISTERED_FLEET":
      return {
        ...state,
        registeredFleet: action.payload
      };
    case "DELETE_FLEET":
      return {
        ...state,
        respDeleteUser: action.payload
      }
    case "RESET":
      return {
        ...state,
        respDeleteUser: null,
        userStatus: null,
        userCarrier: null,
        respUpdateAccessToken: null,
      }
    case "DESMOUNT":
      return {
        ...state,
        alltraveltruck: null,
        editPassword: [],
        editarPerfilUser: [],
        editarPerfilCarrier: [],
        editVehicule: [],
        price: []
      };
    case "CLEAN_TOKEN":
      return {
        ...state,
        token: ""
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
    case "CHANGE_PASSWORD":
      return {
        ...state,
        editPassword: action.payload,
      }
    case "GET_TRAVELS":
      return {
        ...state,
        travels: action.payload,
      };

    case "UPDATE_PERFIL":
      return {
        ...state,
        editarPerfilUser: action.payload,
      }
    case "USER_STATUS":
      return {
        ...state,
        userStatus: action.payload
      }
    case "STATUS_OFF":
      return {
        ...state,
        respStatus: action.payload
      }
    case "STATUS_ON":
      return {
        ...state,
        respStatus: action.payload
      }
    case "REQUEST_CARRIER":
      return {
        ...state,
        userCarrier: action.payload
      }
    case "DESMOUNT":
      return {
        ...state,
        editPassword: [],
        editarPerfilUser: [],
        editarPerfilCarrier: [],
        editVehicule: [],
        price: []
      };
    case "CLEAN_TOKEN":
      return {
        ...state,
        token: "",
        responseLog: null

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
    case "CHANGE_PASSWORD":
      return {
        ...state,
        editPassword: action.payload,
      }
    case "GET_TRAVELS":
      return {
        ...state,
        travels: action.payload,
      };

    case "UPDATE_PERFIL":
      return {
        ...state,
        editarPerfilUser: action.payload,
      }
    case "USER_STATUS":
      return {
        ...state,
        userStatus: action.payload
      }
    case "CONFIRME_REQUEST":
      return {
        ...state,
        confirmTravel: action.payload
      }
    case "UPDATE_ACCESS_TOKEN":
      return {
        ...state,
        respUpdateAccessToken: action.payload
      }
    case "CLEAR_RESP":
      return {
        ...state,
        respUpdateAccessToken: null
      }

    case "ALL_TRAVELS_TRUCK":
      return {
        ...state,
        alltraveltruck: action.payload
      }
    case "UPDATE_VEHICULE":
      return {
        ...state,
        editVehicule: action.payload
      }
    case "CARRIER_TRAVEL":
      return {
        ...state,
        carrierTravels: action.payload
      }
    default:
      return state;
  }
}

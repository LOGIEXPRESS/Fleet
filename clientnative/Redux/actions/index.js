import axios from "axios";
import { API_URLS } from "@env"




export function addCarrier(props) {
  return async function (dispatch) {
    try {
       const add = await axios.post(`${API_URLS}/api/registerfleet`, props) 
       console.log("ESTO ES ADD", add.data)
       return dispatch({
         type: "ADD_CARRIER",
         payload: add.data
       })
    } catch (error) {
       console.log("Error", error) 
    }
  }
}




export function logiar(payload) {
    return async function (dispatch) {
      try {
        console.log(API_URLS)
        const response = await axios.post(`${API_URLS}/api/login`, payload)
        .then((r) => {
            dispatch({
                type: "LOGEO",
                payload: r.data.payload,
                token: r.data.token,
            });
            
            console.log("Aqui esta el token llegando en la action logiarusuario:",r.data.token);
         
        });
       
      }catch(error){

        console.log(error.response);
      }
    };
}

export function adminregister(payload) {
    return async function () {
      try {
        console.log(API_URLS)
        const response = await axios.post(`${API_URLS}/api/adminregister`, payload)
        .then((r) => {
          console.log(r.data.mensaje);
        });
       
      }catch(error){

        console.log(error.response);
      }
    };
}

export function enviarToken(payload) {
    return async function (dispatch) {
      try {
        const response = await axios
          .post(`${API_URLS}/api/verifytoken`, payload) //aca cada uno pone su ip
          .then((r) => {
            //console.log("Token llegando a la action enviarToken", payload);
            dispatch({
              type: "TOKEN",
              payload: r.data.payload,
            });
            // console.log("hace el dispatch");
            console.log("Aqui esta el payload:", r.data.payload);
          });
        // console.log(r);
        // return response;
      } catch (error) {
        console.log(error.response);
      }
    };
}

export function consultReg() {
    return async function (dispatch) {
      try {
        var json = await axios(`${API_URLS}/api/adminExist`);
        dispatch({
          type: "GET_ADMINREG",
          payload: json.data,
        });
        console.log('Esto llega a getadminreg', json.data)
      } catch (error) {
        console.log(error);
      }
    };
}


export function completeProfileCarrier(payload) {
    return async function (dispatch) {
      try {
        const response = await axios.post(
          `${API_URLS}/api/carrierProfile`,
          payload
        );
        console.log('Soy el console.log de responsecomplete', response.data.payload2[1][0])
        return dispatch({
          type: "COMPLETE_PROFILE_CARRIER",
          payload: response.data.payload2[1][0],
        });
      } catch (error) {
        console.log(error.response);
      }
    };
}

export function quotTravel(payload) {
  return async function (dispatch) {
    try {
      const quote = await axios.post(`${ API_URLS }/api/calculatePrice`, payload);
      return dispatch({
        type: "GET_PRICE_QUOTE",
        payload: quote.data.price,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function desmount() {
  return {
    type: 'DESMOUNT',
  };
};
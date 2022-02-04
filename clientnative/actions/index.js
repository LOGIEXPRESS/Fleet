import axios from "axios";
import { API_URLS} from "@env"


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
        // console.log('Soy el console.log de response', response)
        return dispatch({
          type: "COMPLETE_PROFILE_CARRIER",
          payload: response.data,
        });
      } catch (error) {
        console.log(error.response);
      }
    };
}
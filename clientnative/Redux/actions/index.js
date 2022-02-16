import axios from "axios";
import { API_URLS } from "@env"



/* 
export function userStatus () {
  return async function (dispatch) {
    try {
      const users = await axios.get(`${API_URLS}/api/FleetStatus`)
      const filterOn = users.data.allCarrierData.filter((f) => f.status === true )
      const filterOff = users.data.allCarrierData.filter((f) => f.status === null )
      const filterInService = users.data.allCarrierData.filter((f) => f.status === false )
      const filter = {
        On : filterOn ,
        Off: filterOff,
        InService: filterInService
        
      }
      return dispatch ({
        type: "USER_STATUS",
        payload: filter
      })
    } catch (error) {
      console.log("Error",error )
    }
  }
} */


export function updateAccesToken (props) {
  return async function(dispatch) {
    try {
      const update = await axios.post(`${API_URLS}/api/updateToken`, props)
      return dispatch ({
        type: 'UPDATE_ACCESS_TOKEN',
        payload: update.data
      })
    } catch (error) {
        console.log("Error", error)
    }
  }
}


export function requestCarrier (props) {
  return async function (dispatch) {
    try {
      const carrier = await axios.get(`${API_URLS}/api/findOneCarrier?id=${props}`)
      return dispatch ({
        type: 'REQUEST_CARRIER',
        payload: carrier.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}


export function statusOff (props) {
  return async function (dispatch){
    try {
      const update = await axios.post(`${API_URLS}/api/ChangeOff`, props )
      return dispatch({
        type: 'STATUS_OFF',
        payload: update.data
      })
    } catch (error) {
        console.log("Error", error)
    }
  }
}

export function statusOn(props) {
  return async function (dispatch){
    try {
      const update = await axios.post(`${API_URLS}/api/ChangeOn`, props )
      return dispatch({
        type: 'STATUS_ON',
        payload: update.data
      })
    } catch (error) {
        console.log("Error", error)
    }
  }
}


export function userStatus () {
  return async function(dispatch) {
    try {
      const users = await axios.get(`${API_URLS}/api/FleetStatus`)
      return dispatch ({
        type: 'USER_STATUS',
        payload: users.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}



export function updatePerfil (payload) {
  return async function (dispatch) {
    try {
      const update = await axios.post(`${API_URLS}/api/updateUser`, payload)
      return dispatch({
        type: 'UPDATE_PERFIL',
        payload: update.data
      })

    } catch (error) {
        console.log("Error", error)
    }
  }
}

export function getTravels() {
  return async function (dispatch) {
    try {
      const request = await axios.get(`${ API_URLS }/api/Travel`);
      
      return dispatch({
        type: "GET_TRAVELS",
        payload: request.data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function reset(){
  return async function (dispatch){
    try {
      return dispatch({
        type: 'RESET'
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}

export function clearResp (){
  return async function (dispatch){
    try {
      return dispatch({
        type: 'CLEAR_RESP'
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}
export function deleteFleet (props) {
  return async function (dispatch) {
    try {
      const userDeleted = await axios.get(`${API_URLS}/api/deleteFleet?id=${props}`)
      return dispatch({
        type: "DELETE_FLEET",
        payload: userDeleted.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}



export function registeredFleet () {
  return async function (dispatch) {
    try {
      const fleet = await axios.get(`${API_URLS}/api/findFleet`)
      return dispatch({
        type: "REGISTERED_FLEET",
        payload: fleet.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}

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
        console.log("SALIENDO DE DISPACHT LOGIAR",API_URLS)
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

export function getTravelCarrier(idCarrier) {
  console.log("AAAAAAAAAAAAAAAAAAA",idCarrier)
  return async function (dispatch) {
    try {
      const request = await axios.get(`${ API_URLS }/api/carrierTravel/${idCarrier}`);
      return dispatch({
        type: "CARRIER_TRAVEL",
        payload: request.data,
      });
    } catch (error) {
      console.log("Error", error);
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
  console.log("que pasa con consultreg")
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


       const newobj = {... response.data.payload2[1][0], 
        "carrierPaymentData" : {
        carrierToken : false, 
        amount: 0, 
    } 
  }

  console.log("newobj",newobj)




        return dispatch({
          type: "COMPLETE_PROFILE_CARRIER",
          payload: newobj,
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

export function changePassword(payload) {
  return async function (dispatch) {
    try {
      const newpass = await axios.post(`${ API_URLS }/api/changePassword`, payload);
      console.log(newpass.data);
      return dispatch({
        type: "CHANGE_PASSWORD",
        payload: newpass.data
      });

      
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function sendMessage (payload) {
  return async function () {
    try {

      console.log("Sale de la action sendMessage",payload);
      const newpass = await axios.post(`${ API_URLS }/api/requestTravel`, payload);
      

    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function reqTravelConfirm (payload) {
  return async function (dispatch) {
    try {
      const confirm = await axios.post(`${ API_URLS }/api/confirmTravel`, payload);
      return dispatch({
        type: "CONFIRME_REQUEST",
        payload: confirm.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}

export function alltravelstruck (signupId) {
  return async function (dispatch) {
    try {
      const confirm = await axios.get(`${ API_URLS }/api/alltraveltruck/${signupId}`);
      console.log("Leegando a la action alltravelstruck ",confirm.data);
      return dispatch({
        type: "ALL_TRAVELS_TRUCK",
        payload: confirm.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}

export function updateVehicle (payload) {
  return async function (dispatch) {
    try {
      const update = await axios.post(`${API_URLS}/api/updateVehicle`, payload)
      return dispatch({
        type: 'UPDATE_VEHICULE',
        payload: update.data
      })

    } catch (error) {
        console.log("Error", error)
    }
  }
}


export function desmount() {
  return {
    type: 'DESMOUNT',
  };
};

export function cleanToken() {
  return {
    type: 'CLEAN_TOKEN',
  };
};

import axios from "axios";
import { API_URLS} from "@env"


export function logiarUsuario(payload) {
    return async function (dispatch) {
      try {
        console.log(API_URLS)
        const response = await axios.post(`${API_URLS}/api/login`, payload)
        .then((r) => {
            dispatch({
                type: "LOGEOO",
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
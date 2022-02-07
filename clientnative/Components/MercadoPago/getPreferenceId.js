// mercadopago-service.js
import { MP_ACCESS_TOKEN } from "@env"
import axios from "axios";

// You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity
/* export const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${MP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};
 */

export const getPreferenceId = async (payer, ...items) => {
    const body = JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      });
    const response = await axios.post(`https://api.mercadopago.com/checkout/preferences?access_token=${MP_ACCESS_TOKEN}`,body)
    console.log("ESTA ES LA RESPUESTA A LA PETICION0",response.data)
    /* const preference = await response.json(); */
  
    return response.data.id;
  };
import { Response, Request, Router, NextFunction } from 'express';
import { Signup } from '../models/Signup';
import { Carrier }  from '../models/Carrier';
import axios from 'axios';
import {Payment} from '../models/Payment'
 
import { Travel } from '../models/Travel';
import { nextTick } from 'process';
import { where } from 'sequelize/dist';
import { uuid } from 'uuidv4';
const mercadopago = require('mercadopago');

const router=Router()

router.get('/payment', async (req: Request, res: Response) => {
    res.send('Allan Torres line 15');
  });

  router.post('/mercadopago', async (req, res) => {
    const { title, unit_price } = req.body;
    console.log(req.body)
    try{
  
  
    mercadopago.configure({
        access_token: 'TEST-4261065072334441-020320-579a9756136c4e30a0ce0b4f11322878-177928098',
    });
  
    let preference = {
        items: [
            {
                title,
                unit_price,
                quantity: 1,
            },
        ],
    };
  
    let answer = await mercadopago.preferences.create(preference);
  
    const response = answer.body.id;  
    const init_points = answer.body.init_point;
  
    res.json({ response, init_points });
  
  }catch(err){
    console.error(err)
  }
  });
  router.get('/checkout', async (req, res) => {
    let {id}=req.query;
    console.log("#####line 46#####");
    console.log(id);
    let status:any;
    try{
  
      
   const resp= await   axios
          .get('ttps://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js?data-preference-id='+id, {
          
      })
      .then((res) => {
        console.log(res.statusText)
         status=res.statusText;
      });
     res.send(status);
    }
 catch(err){
    console.error(err)
  }
  });
 
// router.get('/payment', async (req: Request, res: Response) => {
//     res.send('Allan Torres line 15');
//   });

router.post("/mercadopago", async (req, res) => {
  const { unit_price, access_token, title, quantity } = req.body;
  console.log("ESTO ES ACCES TOKEN" , access_token)
  let carrier = await 
  console.log("ESTO ES REQ.BODY", req.body);
  try {
    mercadopago.configure({
      access_token: access_token,
    });

    let preference = {
      "items": [
          {
             "title": title,
                  "description": "Dummy Item Description",
                  "quantity": quantity,
                  "currency_id": "ARS",
                  "unit_price": unit_price
          }
      ],
      "payer": {
          "email": "payer@email.com"
      },
      "auto_return": "all",
      "back_urls" : {
          "failure": "https://superfleetback.herokuapp.com/api/render?x=0",
          "pending": "https://superfleetback.herokuapp.com/api/render?x=1",
          "success": "https://superfleetback.herokuapp.com/api/render?x=2"
      }
  }

    let answer = await mercadopago.preferences.create(preference);

    const response = answer.body.id;
    const init_points = answer.body.init_point;

    res.json({ response, init_points });
  } catch (err) {
    console.error(err);
  }
});

  
router.get('/checkout', async (req: Request, res: Response) => {
  let {id}=req.query;
  console.log("#####line 46#####");
  console.log(id);
  let status:any;
  try{


  const resp= await   axios
        .get('https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js?data-preference-id='+id, {

    })
    .then((res) => {
      console.log(res.statusText)
        status=res.statusText;
    });
    res.send(status);
  }
catch(err){
  console.error(err)
}
});

// router.get('totalprice',(req: Request, res: Response, next: NextFunction) => {
//   let {id} = req.query
//   try {


    
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/render', (req: Request , res: Response, ) => {

  let {x} = req.query
  // const {id} = req.params

  if(x === "0"){
      return   res.send(`
      <body style="background-color:red; color: white " >
      <img src="https://user-images.githubusercontent.com/70895686/153325791-f3df7c3a-84d1-4d71-a35a-96f6be0f611e.png" style="display: block;
      margin-left: auto;
      margin-right: auto;
      width:300px;
      height:300px;
      " />
        <h1 style="text-align:center ; margin-top: 15vh ; font-size: 70px">Pago fallido!</h1>
      </body>
    `);
  }
  if (x==="1") {
    return res.send(`
    <body style="background-color:yellow; color: black " >
      <img src="https://user-images.githubusercontent.com/70895686/153325791-f3df7c3a-84d1-4d71-a35a-96f6be0f611e.png" style="display: block;
      margin-left: auto;
      margin-right: auto;
      width:300px;
      height:300px;
      "
      />
      <h1 style="text-align:center ; margin-top: 15vh ; font-size: 70px">Pago pendiente!</h1>
    </body>
  `);
  }

  if(x==="2"){
    return   res.send(`
    <body style="background-color:white; color: white " >
    <img src="https://user-images.githubusercontent.com/70895686/153325791-f3df7c3a-84d1-4d71-a35a-96f6be0f611e.png" style="display: block;
    margin-left: auto;
    margin-right: auto;
    width:300px;
    height:300px;
    " />
      <h1 style="text-align:center ; margin-top: 15vh ; font-size: 70px; color: #009de2 ">Pago exitoso!</h1>
    </body>
  `)
  }
  res.send(`Error en el paramentro x = ${x}`)
})

router.get('/payment/:truckId', async (req: Request, res: Response , next: NextFunction) => {

  const {truckId} = req.params
  try {

    let payment = await Travel.findAll({
      where: {
        finishedTravel: "process",
        truckId: truckId
      },attributes: [ 'price' ]
    });

    let amount=payment.map(p=>Number(p.price)).reduce((previousValue, currentValue) => previousValue + currentValue)

    await Payment.create({ 
      id:uuid(),
      amount: amount , 
      TruckId :truckId 
    })

    res.json({payment,amount})

  } catch (error) {
    next(error);
  }
});

export default router

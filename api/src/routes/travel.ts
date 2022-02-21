import { Response, Request, Router, NextFunction, response } from 'express';
const { Op } = require("sequelize");
import { uuid } from 'uuidv4';

import { Travel } from '../models/Travel';
import { Carrier } from '../models/Carrier';
 
import { Truck } from '../models/Truck';
 
import { Signup } from '../models/Signup';
import { Payment } from '../models/Payment';
 

const router = Router()
router.get('/allan', async (req: Request, res: Response) => {
  res.send('Allan Torres line 15');
});


function getDistanciaMetros(origen: string, destino: string) {
  var newOrigen = origen.split("/")
  var newDestino = destino.split("/")
  var lat1 = newOrigen[0];
  var lon1 = newOrigen[1];
  var lat2 = newDestino[0];
  var lon2 = newDestino[1];
  var rad = function (x: number) { return x * Math.PI / 180; }
  var R = 6378.137; //Radio de la tierra en km 
  var dLat = rad(parseFloat(lat2) - parseFloat(lat1));
  var dLong = rad(parseFloat(lon2) - parseFloat(lon1));
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(parseFloat(lat1))) *
    Math.cos(rad(parseFloat(lat2))) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  var d = R * c * 1000;
  return d / 1000;
}

router.get('/actualTravel',async(req:Request,res:Response,next:NextFunction)=>{
 
  const{id}=req.query
  
    if(id===''){return res.send('El id no puede estar vacio')}
      let carrier=await Carrier.findAll({//tengo el id de la tabla Carrier
          where:{
              SignupId:id
          }
      })
    
      if(!carrier.length){
            // let user=await Admin.findAll({//tengo el id de la tabla Carrier
            //     where:{
            //         SignupId:id
            //     }
            // })

                let travel=await Travel.findAll({where:{
                  adminId:id,
                  finishedTravel: { [Op.eq]: null }
              }})
              
              if(!travel.length){
                  return res.send('Carrier not travels')
              }

              else res.send(travel);
      }else{
       
          let travel=await Travel.findAll({where:{
              carrierId:carrier[0].id,
              finishedTravel: { [Op.eq]: null }
          }})
          return res.send(travel)
          
        //   if(!travel.length){
        //       return res.send('Carrier not travels')
        //   }
        //   else res.send(travel);
        }     


})

router.post('/calculatePrice', (req: Request, res: Response) => {
  //226.49013972673578
  //price 45298,0279
  try {
    console.log(req.body)
    const { origen, destino, weight } = req.body
    // var destino= "-26.8082848,-65.2175903"
    // var origen= "-24.7821269,-65.4231976"
    // let weight= 20;
    let distance = getDistanciaMetros(origen, destino);
    const valor = 10; /// valor de tonelada por km recorrido
    let price = Math.round(valor * (weight * distance))

    res.send({ price });
  } catch (error) {
    console.log("Error", error)
  }

});


router.post('/requestTravel', async (req: Request, res: Response, next: NextFunction) => {
              //id es el del administrador 
              const { id, orig, destination, weight, price, description, finishedTravel} = req.body

              try {
                        let TravelId = uuid()
                        var newViaje = {
                          id: TravelId,
                          orig,
                          destination,
                          weight,
                          price,
                          description,
                          adminId: id,
                          finishedTravel,
                        }


                   let traveles = await Travel.create(newViaje)

               
                  res.send({ id: TravelId })

              } catch (err) {
                next(err)
              }

});

 


// router.post('/oneTravel', async (req: Request, res: Response, next: NextFunction) => {

//   const { id } = req.body
//   let getTravel = await Travel.findAll({ where: { id: id } })
//   let varUser = await Carrier.findAll({ where: { id: getTravel[0].adminId } , include:[{ model: Signup }]  })
//  /*  let varUserReg = await User_Reg.findOne({ where: { id: varUser[0].idUserReg } }); */
//   let varCarrier = await Carrier.findAll({where: { id: getTravel[0].carrierId}, include:[{ model: Signup }] })
//   const travelFullData = { travel: getTravel[0], user: varUser[0], carrier: varCarrier[0] }
//   if (getTravel.length === 0){
//     return res.send('Travel not found');
//   } 
//   else {
//     return res.send(travelFullData);}
//     /* res.send({varUser}) */
// });







router.get('/Travel', async (req: Request, res: Response, next: NextFunction) => {

   try {
    //Importante en el modelo de travel hay un error en declaración de la relacion con user User_Reg
    //hay que corregir que es de tipo string 
    /* let travel = await Travel.findAll() */
    const travel = await Travel.findAll({
      where:{
        truckId:{[Op.eq]:null}
      },
      include:[Signup,Truck]
    }) 

  
   res.send(travel);

  }
  catch (err) {
    next(err)
  }
  

});

router.get('/alltraveltruck/:signupId', async (req: Request, res: Response, next: NextFunction) => {
  const { signupId } = req.params
  
  console.log("EStos es req.params:" , req.params)
  try {

    let truckId = await Truck.findOne({ where: { SignupId: signupId } });
 
    let travelinprocess = await Travel.findAll({
     where:{
       truckId:{[Op.eq]:truckId?.id}, finishedTravel: "process"
     }
   }) 

  let travelfinished = await Travel.findAll({
    where:{
      truckId:{[Op.eq]:truckId?.id}, finishedTravel: "finish"
    }
  })

  /* console.log("ESTO ES EN /alltraveltruck", { "travelinprocess":travelinprocess[0].id , "travelfinished": travelfinished } ) */
  
  return res.status(200).json({ "travelinprocess":travelinprocess , "travelfinished": travelfinished });
 }
 catch (err) {
   next(err);
 }
 

});


 
router.post('/waitTravel', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.body
  let getTravel = await Travel.findAll({ where: { userId: id, carrierId: { [Op.eq]: null }, finishedTravel: { [Op.is]: null } } })
  if (getTravel.length === 0) res.send({ data: 0 });
  else res.send(getTravel);

});
router.put('/acceptTravel', async (req: Request, res: Response, next: NextFunction) => {
    //id=es el Id de travel que viene desde el front
    const { truckId, id } = req.body
  
  
  
    const upTravel = await Travel.update({ truckId: truckId }, { where: { id: id }, returning: true });
    if (upTravel[0] === 1) {
 
      
  
     
  
      res.send(upTravel[1][0]);
    }
    else res.send('id travel incorrecto');
  
  });

router.get('/carrierTravel/:idCarrier',async(req:Request,res:Response,next:NextFunction)=>{

  const { idCarrier }=req.params
  console.log("ESTO ES REQUEST PARAM",req.params)
  
  try{

    let idTruck= await Truck.findOne({
      where:{
        SignupId:idCarrier
      }
    })
    if(idTruck){
      
      let carrierTravel=await Travel.findAll({
      where:{
        [Op.and]: [{truckId:idTruck.id }, { finishedTravel: 'process' }],

      }})

      if(!carrierTravel.length){
        return res.json({menssage:'user travel',payload:carrierTravel})
      }else{
        return res.json({menssage:'user travel',payload:carrierTravel})
      }
      
      


    



    }else{
      return res.json({menssage:'user travel',payload:[]})
    }
    

    

   
    



  }catch(e){
    
    next(e)
  }

})

router.get('/TravelOn/:idRole',async(req:Request,res:Response,next:NextFunction)=>{

  const { idRole }=req.params
  console.log("ESTO ES REQUEST PARAM",req.params)
  try{

    let userTravel=await Travel.findAll({
      where:{
        [Op.and]: [{userId:idRole }, { finishedTravel: 'process' }],
      }
    })
    console.log("ESTE ES EL VIAJE ACTUAL", userTravel)
    if(!userTravel.length){
      return res.send('user sin travel')
    }
    res.json({menssage:'user travel',payload:userTravel})



  }catch(e){
    next(e)
  }

})




router.post('/confirmTravel', async (req:Request,res:Response,next:NextFunction) => {
  //id es del travel 
  //userId es id carrier de singup  
  const { userId, id } = req.body;
  try {
    let idCarrier=await Truck.findOne({
      where:{
        SignupId:userId
      }
    })
    if(idCarrier){
      let confirm = await Travel.update(
      { finishedTravel: "process", truckId: idCarrier.id },
      { where: { id: id },
      returning: true, }

      
    );
    let changeStatusTruck= await Truck.update({status:false},{where:{
      SignupId:userId

    }})
    // let payment= await Payment.create({
    //   id:uuid(),
    //   amount:Number(confirm[1][0].price),
    //   status:true,
    //   TruckId:idCarrier.id
    // })
    // console.log("ESTO DEVUELVE CONFIRM TRAVEL,", confirm);
    return res.send(confirm);
    }
    return res.send('not found carrier')


    
  } catch (error) {
    next(error);
  }
})


router.post('/finishTravel/:idTravel',async(req:Request,res:Response,next:NextFunction)=>{

  const{idTravel}=req.params

  try{

    let finishTravel=await Travel.findOne({//encuentro el travel
      where:{
        id:idTravel,
        finishedTravel:'process'

      }
    })

    if(!finishTravel){
      return res.json({menssage:`Not found Travel id: ${idTravel}`})
    }

    let payment= await Payment.findOne({
      where:{
        TruckId:finishTravel.truckId,
        status:false
      }
    })

    let statusTruck=await Truck.update({status:true},{where:{id:finishTravel.truckId}})

    //si hay un payment para ese carrier q no esta pagado status:false
    if(payment){
      let amount=Number(payment.amount)
      let price=Number(finishTravel.price)
      let sum=amount+price

      let paymentUpDateAmount= await payment.update({amount:sum})

      let updateTravel= await finishTravel.update({finishedTravel:'pending',returning: true})

      return res.json({menssje:'Finish travel',payload:updateTravel,paymentUpDateAmount})
    }
    
    //si no hay payment lo creo
    let updateTravel= await finishTravel.update({finishedTravel:'pending',returning: true})

    let newPayment= await Payment.create({
      id:uuid(),
      amount:Number(finishTravel.price),
      status:false,
      TruckId:finishTravel.truckId
    })

    return res.json({menssje:'Finish travel',payload:updateTravel,newPayment})

  }catch(err){
    next(err)
  }

})





export default router;
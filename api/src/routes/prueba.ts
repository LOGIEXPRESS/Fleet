import { Response, Request, Router, NextFunction } from 'express';

import { v4 } from "uuid";

import nodemailer from 'nodemailer'
import { Travel } from '../models/Travel';
import { Op } from 'sequelize';
import { Truck } from '../models/Truck';
import { Signup } from '../models/Signup';




const router = Router()

router.get('/prueba', async (req: Request, res: Response, next: NextFunction) => {
    
    
    try {
            res.send("ESTO ES UNA PRUEBA dos")
    }
    catch (err) {
        next(err)
    }
});

router.post('/sendEmail',async(req:Request,res:Response,next:NextFunction)=>{

    const{email,link,pass}=req.body

    let contentHTML=`
    <h1>New user</h1>
    <ul>
        <li>email: ${email}</li>
        <li>password:${pass}</li>
        <li><a href=${link}>link</a></li>
    
    </ul>`

    
    let transporter= nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "logiexpressfleet@gmail.com",
          pass: "boilbfullbjrotpf",
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    try{
        let info = await transporter.sendMail({
            from: '"Logiexpress Fleet" <logiexpressfleet@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Inicio seccion Fleet", // Subject line
            text: "Hello world?", // plain text body
            html: contentHTML, // html body
        });

        res.json({res:`${info.messageId}`})

    }catch(err){
        next(err)
    }
   



})
router.get('/id',(req:Request,res:Response)=>{

    res.send(`id:${v4()}`)

})

router.get('/filterByEstate/:estate',async(req:Request,res:Response,next:NextFunction)=>{

    const{estate}=req.params

   
    try{

        let travels= await Travel.findAll({
            where:{
                finishedTravel:estate
            },
                   
            })
        if(travels.length){
            return res.send(travels)
        }
        return res.json({menssage:`Not found travels with estate ${estate}`})

    }catch(err){
        next(err)
    }
})

// weight

router.get('/filterByWigth/:maxWigth',async(req:Request,res:Response,next:NextFunction)=>{

    const{maxWigth}=req.params

    try{

        let travels= await Travel.findAll({
            where:{
                weigth:{
                    [Op.gte]:Number(maxWigth)
                }
            },
            order:[['weigth','ASC']]
        })
        if(travels.length){

            return res.send(travels)
        }
        return res.json({menssage:`Not fouend travels with ${maxWigth}`})

    }catch(err){
        next(err)
    }



})

router.get('/include/:id',async(req:Request,res:Response,next:NextFunction)=>{

    const{id}=req.params

    try{

    let response = await Travel.findAll({
        where: {
          id: id
        }, include: [ Truck , Signup]
      })

      res.send(response)
    }catch(err){
        next(err)
    }
})
// router.get('/Travel/:latitude/:longitude', async (req: Request, res: Response, next: NextFunction) => {

//   const{latitude,longitude}=req.params
//   let origin=`${String(latitude)}`
//   // console.log(origin.split('.')[0])

//   // -34.6036844/-58.3815591/Buenos Aires, Argentina
//   // {
//   //   "latitude": -38.927636,
//   //   "latitudeDelta": 0.0922,
//   //   "longitude": -68.0710125,
//   //   "longitudeDelta": 0.0421,}

//   if(latitude){
//     try{
//         // console.log(origin)
//       let travel=await Travel.findAll({
//         where:{

//           [Op.and]:[{orig:{[Op.startsWith]:`${origin.split('.')[0]}`}},{truckId:{[Op.eq]:null}}]

//         },
//         include:Signup
//       })
//       res.send(travel)

//     }catch(err){
//       next(err)
//     }

//   }else{
//       try {
//     //Importante en el modelo de travel hay un error en declaración de la relacion con user User_Reg
//     //hay que corregir que es de tipo string 
//     /* let travel = await Travel.findAll() */
//     const travel = await Travel.findAll({
//       where:{
//         truckId:{[Op.eq]:null}
//       },
//       include:[Signup,Truck]
//     }) 

  
//    res.send(travel);
//     // if (travel.length > 0) {
//     //   let tam = travel.length;
//     //   var travelFullData = [];
//     //   for (let i = 0; i < tam; i++) {

//     //     let varUser = await Carrier.findAll({ where: { id: travel[i].adminId } })
//     //     let varUserReg = await Signup.findOne({ where: { id: varUser[0].SignupId } });
//     //     travelFullData[i] = { travel: travel[i], user: varUser[0], userReg: varUserReg }
//     //   }
//     //   return res.send(travelFullData)
//     // }
//     //res.send('data not found')
//     //por consola me aparece:"Executing (default): SELECT "id", "ducumentoIdentidad", "eMail", "ubicacion", "cel", "tel", "fotoPerfil", "medioPago", "name", "lastName", "paswword", "terminosCondiciones", "createdAt", "updatedAt" FROM "Users" AS "User";"
//     //no pude corregirlo!!
//   }
//   catch (err) {
//     next(err)
//   }
//   }




// });


export default router


//generador de contraseñas
// var randomstring = Math.random().toString(36).slice(-8);


// console.log(randomstring)


//   var randPassword = Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('').toLocaleLowerCase();
//   console.log(randPassword)



// let payment=  [
//      {
//       TruckId: "9d8a33fa-842e-44d5-a15c-61613512a41a",
//       amount: 325835,
//       createdAt: "2022-02-16T17:25:32.921Z",        
//       id: "91d063c8-87ed-49aa-af4b-86045db6b31e",   
//       status: true,
//       updatedAt: "2022-02-16T17:25:32.921Z",        
//     },
//     {
//         TruckId: "9d8a33fa-842e-44d5-a15c-61613512a41a",
//         amount: 40000,
//         createdAt: "2022-02-16T17:25:32.921Z",        
//         id: "91d063c8-87ed-49aa-af4b-86045db6b31e",   
//         status: false,
//         updatedAt: "2022-02-16T17:25:32.921Z",        
//     }
// ]

// let filter= payment.filter(e=>e.status===false)

// console.log(filter)

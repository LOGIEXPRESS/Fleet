import { Response, Request, Router, NextFunction } from 'express';

import { v4 } from "uuid";

import nodemailer from 'nodemailer'
import { Travel } from '../models/Travel';
import { Op } from 'sequelize';




const router = Router()

router.get('/prueba', async (req: Request, res: Response, next: NextFunction) => {
    
    
    try {
            res.send("ESTO ES UNA PRUEBA")
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


export default router


//generador de contraseñas
// var randomstring = Math.random().toString(36).slice(-8);


// console.log(randomstring)


//   var randPassword = Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('').toLocaleLowerCase();
//   console.log(randPassword)
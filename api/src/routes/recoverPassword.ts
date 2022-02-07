import { Response, Request, Router, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Signup } from '../models/Signup';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';



const router=Router()


router.post('/recoverPass',async(req:Request,res:Response,next:NextFunction)=>{

    let {eMail,secret}=req.body

    

    if(eMail && secret){

        secret=secret.toLowerCase().trim()
        
        eMail=eMail.trim()

        try{

            let user=await Signup.findOne({
                where:{
                    [Op.and]:[{eMail:eMail},{secret:secret}]
                }
            })
            if(!user){
                return res.send(`not found user with email: ${eMail} and secret ${secret}`)
            }
            let password = Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('').toLowerCase()
            let passwordHash = await bcrypt.hash(password, 8)

            let upDataPassUser= await user.update({

                password:passwordHash
            })



            let contentHTML =
            `<h1>New password</h1>
                   <ul>
                      <li>${user.name} ${user.lastName}</li>
                      <li>email: ${eMail}</li>
                      <li>New password:${password}</li>    
                   </ul> 
            `
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // upgrade later with STARTTLS
                auth: {
                    user: "logiexpressfleet@gmail.com",
                    pass: "boilbfullbjrotpf",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let info = await transporter.sendMail({
                from: '"Logiexpress Fleet" <logiexpressfleet@gmail.com>', // sender address
                to: eMail, // list of receivers
                subject: "New Password Fleet", // Subject line
                text: "Hello world?", // plain text body
                html: contentHTML, // html body
            });
        
            


            return res.json({menssage:`new password sen to ${eMail}`,payload:eMail})
            

        }catch(err){
            next(err)
        }
    }
    return res.json({menssage:'faltan datos'})
})


export default router
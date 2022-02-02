import { Response, Request, Router, NextFunction } from 'express';

import { v4 } from "uuid";

import nodemailer from 'nodemailer'


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
export default router
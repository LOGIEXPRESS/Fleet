import { Response, Request, Router, NextFunction } from 'express';
const nodemailer = require('nodemailer');
import { uuid } from 'uuidv4';
const bcrypt = require("bcryptjs");
const router = Router()
import { Signup } from '../models/Signup';

router.get('/allan', async (req: Request, res: Response, next: NextFunction) => {
     
    
    try {
            res.send("Allan Torres")
    }
    catch (err) {
        next(err)
    }
});


router.post('/registerfleet', async (req: Request, res: Response, next: NextFunction) => {
    
  // const data1 = JSON.parse(req.body)
    // console.log("Estes es el body", req.body);

    const { name, lastName, eMail} = req.body
    let password=Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('').toLowerCase()
    let passwordHash = await bcrypt.hash(password, 8)

    let payload = {
        id: uuid(),
        name,
        lastName,
        eMail,
        password: passwordHash,
        role:false
    }
    ////////<inicio formato> Este es el mensaje que se le va a enviar al usuario con formato html
    let contentHTML=
    `<h1>New user</h1>
               <ul>
                  <li>${name} ${lastName}</li>
                  <li>email: ${eMail}</li>
                  <li>password:${password}</li>    
               </ul> `

    //////</fin formato>
    /////<inicio configuración transporter>ç
    
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
    ////</fin  configuración transporter>
    try {
        const [user,created] = await Signup.findOrCreate({//crea un usuario si no excisiste 
            where: { eMail: eMail },
            defaults: payload,
        })

        if (!created) {
            const payload = {
                role: 1,
            };
            return res.json({ payload, mensaje: 'eMail usado' })//podria ser un boolean 
        }

        let info = await transporter.sendMail({
            from: '"Logiexpress Fleet" <logiexpressfleet@gmail.com>', // sender address
            to: eMail, // list of receivers
            subject: "Inicio seccion Fleet", // Subject line
            text: "Hello world?", // plain text body
            html: contentHTML, // html body
        });
        return res.json({
            mensaje: 'Usuario creado', payload
        }).status(300);
    }
    catch (err) {
        next(err)
    }
});
// router.post('/sendEmail',async(req:Request,res:Response,next:NextFunction)=>{

//     const{ name, lastName, email}=req.body
//     let password=uuid()
 

 
//     let contentHTML=
//     `<h1>New user</h1>
//                <ul>
//                   <li>${name} ${lastName}</li>
//                   <li>email: ${email}</li>
//                   <li>password:${password}</li>    
//                </ul> `


//     let transporter= nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, // upgrade later with STARTTLS
//         auth: {
//           user: "logiexpressfleet@gmail.com",
//           pass: "boilbfullbjrotpf",
//         },
//         tls:{
//             rejectUnauthorized:false
//         }
//     });

//     try{
//         let info = await transporter.sendMail({
//             from: '"Logiexpress Fleet" <logiexpressfleet@gmail.com>', // sender address
//             to: email, // list of receivers
//             subject: "Inicio seccion Fleet", // Subject line
//             text: "Hello world?", // plain text body
//             html: contentHTML, // html body
//         });

//         res.send({info})

//     }catch(err){
//         next(err)
//     }




// })
export default router





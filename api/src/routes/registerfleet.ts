import { Response, Request, Router, NextFunction } from 'express';
import { FileTextChanges } from 'typescript';
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
import { uuid } from 'uuidv4';
const bcrypt = require("bcryptjs");
const router = Router()
import { Signup } from '../models/Signup';
import { Truck } from '../models/Truck';
import { Carrier } from '../models/Carrier';

router.get('/allan', async (req: Request, res: Response, next: NextFunction) => {


    try {
        res.send("Allan Torres")
    }
    catch (err) {
        next(err)
    }
});

router.get('/carriers', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const carrier = await Signup.findAll();
        return res.json({
            carrier
        }).status(200);
    }
    catch (err) {
        next(err)
    }
});

router.get('/findFleet', async (req: Request, res: Response, next: NextFunction) => {

    var fleet = await Signup.findAll({
        where: { role: { [Op.eq]: false } },
    });
    if (fleet.length === 0) { return res.send(null); }
    let arr: any = []; let carrier: any = [];
    for (var i = 0; i < fleet.length; i++) {

        carrier[i] = await Truck.findAll({
            where: { SignupId: fleet[i].id }
        }
        )
        arr[i] = { transportista: fleet[i], vehiculo: carrier[i].length === 0 ? "No tiene vehiculo registrado" : carrier[i][0] };
    }

    res.send(arr);
});


router.post('/registerfleet', async (req: Request, res: Response, next: NextFunction) => {

    // const data1 = JSON.parse(req.body)
    // console.log("Estes es el body", req.body);

    const { name, lastName, eMail } = req.body
    let password = Array(5).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('').toLowerCase()
    let passwordHash = await bcrypt.hash(password, 8)

    let payload = {
        id: uuid(),
        name,
        lastName,
        eMail,
        password: passwordHash,
        role: false,
    };
    ////////<inicio formato> Este es el mensaje que se le va a enviar al usuario con formato html
    let contentHTML = `<h1>Bienvenido a Fleet ${name} ${lastName}!</h1>
                        <h2>Has sido añadido a la Flota</h2>
                        <h2>Estas son tus credenciales para ingresar a Fleet:</h2>
               <ul>                  
                  <li>Mail: ${eMail}</li>
                  <li>Contraseña: ${password}</li>    
               </ul> `;

    //////</fin formato>
    /////<inicio configuración transporter>ç

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
    ////</fin  configuración transporter>
    try {
        const [user, created] = await Signup.findOrCreate({//crea un usuario si no excisiste 
            where: { eMail: eMail },
            defaults: payload,
        })

        const admin = {
            id: uuid(),
            eMail: user.eMail,
            company: user.business,
            SignupId: user.id

        }
        await Carrier.create(admin)

        if (!created) {
            const payload = {
                role: 1,
            };
            return res.json({ payload, mensaje: 'eMail usado' })//podria ser un boolean 
        }

        let info = await transporter.sendMail({
            from: '"Fleet" <logiexpressfleet@gmail.com>', // sender address
            to: eMail, // list of receivers
            subject: "Ingresa a Fleet", // Subject line
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

router.get('/deleteFleet', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.query
    if (id === '') { return res.send('El id no puede estar vacio') }
    try {
        const carrier = await Truck.destroy({
            where: {
                SignupId: id
            }
        })
        const signup = await Signup.destroy({
            where: {
                id: id
            }
        })

        if (signup === 1) return res.send({ mensaje: "Usuario eliminado" })
        else return res.send({ mensaje: "Error al eliminar usuario." })

    }
    catch (err) {
        next(err)
    }
});



router.get('/findOneCarrier', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.query

    try {
        let carrier = await Signup.findOne({
            where: { id: id }, 
            include: [{
                model: Truck
            }]

        })
        if (!carrier) {
            return res.send(false)//carrir ya completo su perfil
        }
        return res.send(carrier)


    } catch (err) {
        next(err)
    }

})
export default router





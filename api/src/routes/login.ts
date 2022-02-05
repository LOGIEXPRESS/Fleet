import { Response, Request, Router, NextFunction } from 'express';

import config from '../../config/config';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Signup } from '../models/Signup';
import { Op } from 'sequelize';


const router = Router()

// funcion que crea el token
function createToken(payload: any) {

    return jwt.sign({ id: payload.id, email: payload.eMail }, config.jwtSecret, {
        expiresIn: 200
    })
}

router.post('/login', async (req: Request, res: Response) => {
	const { eMail, password } = req.body

	const user = await Signup.findAll({ where: { eMail: eMail } })

	if (user.length > 0) {

		const compare = await bcryptjs.compare(password, user[0].password)

		if (compare) {


			const payload = {
				eMail,
				id: user[0].id,
				role: user[0].role,
				name: user[0].name,
				lastName: user[0].lastName,
                identification:user[0].identification,
				phone: user[0].phone,
				photo:  user[0].photo,
				locacion: user[0].locacion,
				business: user[0].business,
			};
			if(!user[0].identification && !user[0].role){
				return res.json({
					token: createToken(payload), // se crea el token
					mensaje: 'Autenticación correcta', 
					payload,
					completPerfil:false
				}).status(200);



				
			}

			return res.json({
				token: createToken(payload), // se crea el token
				mensaje: 'Autenticación correcta',
				payload,
				completPerfil:true
			}).status(200);


		} else {
			const payload = {
				eMail,
				id: user[0].id,
				role:1,
				// role: user[0].role,
				name: user[0].name,
				lastName: user[0].lastName,
				phone: user[0].phone,
			};
			return res.json({
				mensaje: "Contrasena no coincide", payload
			}).status(300)
		}
	} else {


		const payload = {
			role: 1,
		};
		return res.json({ payload, mensaje: "usuario y mail ingresados son invalidos" }).status(301)
	}
});

router.get('/adminExist',async(req:Request,res:Response,next:NextFunction)=>{

    try{
        let admin= await Signup.findOne({
            where:{
                role:true
            }
        })
        if(admin){
            return res.send(true)
        }
        return res.send(false)

    }catch(err){
        next(err)
    }
})

// router.get('/findCarrier/:eMail',async(req:Request,res:Response,next:NextFunction)=>{

// 	const{eMail}=req.params

// 	try{
// 		let carrier= await Signup.findOne({
// 			where:{

// 				[Op.and]:[{eMail:eMail},{identification:null},{role:false}]

				

// 			}

// 		})
// 		if(!carrier){
// 			return res.send(false)//carrir ya completo su perfil
// 		}
// 		return res.send(true)


// 	}catch(err){
// 		next(err)
// 	}

// })
router.get('/findInfo/:eMail',async(req:Request,res:Response,next:NextFunction)=>{

	const{eMail}=req.params

	try{
		let carrier= await Signup.findOne({
			where:{

				eMail:eMail

				

			}

		})
		if(!carrier){
			return res.send('not found info')//carrir ya completo su perfil
		}
		return res.send(carrier)


	}catch(err){
		next(err)
	}

})



export default router;	
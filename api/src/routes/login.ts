import { Response, Request, Router, NextFunction } from 'express';

import config from '../../config/config';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Signup } from '../models/Signup';


const router = Router()

// funcion que crea el token
function createToken(payload: any) {

    return jwt.sign({ id: payload.id, email: payload.eMail }, config.jwtSecret, {
        expiresIn: 60
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
				lastname: user[0].lastName,
                identification:user[0].identification,
				phone: user[0].phone,
				photo:  user[0].photo,
			};

			return res.json({
				token: createToken(payload), // se crea el token
				mensaje: 'Autenticación correcta', payload
			}).status(200);


		} else {
			const payload = {
				eMail,
				id: user[0].id,
				role:1,
				// role: user[0].role,
				name: user[0].name,
				lastname: user[0].lastName,
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


export default router;	
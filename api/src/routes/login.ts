import { Response, Request, Router } from 'express';

import config from '../../config/config';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SingUp } from '../models/Signup';


const router = Router()


function createToken(payload: any) {

    return jwt.sign({ id: payload.id, email: payload.eMail }, config.jwtSecret, {
        expiresIn: 60
    })
}

router.post('/login', async (req: Request, res: Response) => {
	const { eMail, password } = req.body

	const user = await SingUp.findAll({ where: { eMail: eMail } })

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
				token: createToken(payload),
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


export default router;	
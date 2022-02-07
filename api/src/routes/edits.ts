import { Response, Request, Router, NextFunction } from 'express';
import { Signup } from '../models/Signup';
import { Carrier }  from '../models/Carrier';



const router=Router()

//cambio de lugar las rutas 

// router.get('/logout', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
//     req.logOut()
//     res.json({ user: { username: '', role: '' }, success: true });
// }); 


// router.post('/changePassword',async(req:Request,res:Response,next:NextFunction)=>{

//     const {id,newPassword}=req.body
//     // console.log('id user: ',id)
//     // console.log('newPass: ',newPassword)

//    try{

//     let userEdit= await Signup.findByPk(id)
//     .then(async(user)=>{
//         if(!user){
//             return res.json({menssage:'Not found UserEdit'})
//         }else{
//             let newPasswordHash = await bcrypt.hash(newPassword, 8)

//             await user.update({password:newPasswordHash})

//             return user

//         }
        
//     })

//     res.json({menssage:'update password ok',payload:userEdit})
// }catch(err){
//     next(err)
// }
    

// })

router.post('/updateVehicle', async (req: Request, res: Response, next: NextFunction) => {
	
	try{
		const { id, brand, patent, model, color, capacity} = req.body
	
		// const carrierId = await Carrier.findOne({ where: { SignupId: id } })

		let vehicle

		if (brand || patent || model || color || capacity) {

			let upDateThis: any = {}

			if(brand){upDateThis.brand = brand}
			if(patent){upDateThis.patent = patent} 
			if(model){upDateThis.model = model}
			if(color){upDateThis.color = color}
			if(capacity){upDateThis.capacity = capacity}
			
			vehicle = await Carrier.update(upDateThis, {
				where: {
					SignupId: id
				},
				returning: true,
			})
		}
			
		if (vehicle){
			res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","data": vehicle[1][0]}) 
		}else{
			res.status(404).json({ "msg": 'No se encontro usuario registrado' })
		}

	} catch (err){

		res.status(404).json({msg:"rompio"})
		
		console.log(err)
	}

})

router.post('/updateUser', async (req: Request, res: Response, next: NextFunction) => {
	
	try{
		const { id, name, lastName, phone, photo } = req.body
	
		let userUpdate;

		if (name || lastName || phone || photo) {

			let upDateThis: any = {}

			if(name){upDateThis.name = name}
			if(lastName){upDateThis.lastName = lastName}
			if(phone){upDateThis.phone = phone}
            if(photo){upDateThis.photo = photo}
	
			userUpdate = await Signup.update(upDateThis, {
				where: {
					id
				},
				returning: true,
			})
		}

	    if (userUpdate){
			res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","data": userUpdate[1][0]})
			
		}else{
		
			res.status(404).json({ msg: 'No se encontro usuario registrado' })
		}
	} catch (err){

		res.status(404).json({msg:"rompio"})
		
		console.log(err)
	}

})

export default router
import { Response, Request, Router, NextFunction } from 'express';
import { Signup } from '../models/Signup';

import bcrypt from "bcryptjs";



const router=Router()



router.post('/changePassword',async(req:Request,res:Response,next:NextFunction)=>{

    const {id,newPassword}=req.body
    // console.log('id user: ',id)
    // console.log('newPass: ',newPassword)

   try{

    let userEdit= await Signup.findByPk(id)
    .then(async(user)=>{
        if(!user){
            return res.json({menssage:'Not found UserEdit'})
        }else{
            let newPasswordHash = await bcrypt.hash(newPassword, 8)

            await user.update({password:newPasswordHash})

            return user

        }
        
    })

    res.json({menssage:'update password ok',payload:userEdit})
}catch(err){
    next(err)
}
    

})

export default router;	
// import { Response, Request, Router, NextFunction } from 'express';

// import { Carrier } from '../models/Carrier';
// import { Travel } from '../models/Travel';
// import { User } from '../models/User';

// const router=Router()



// router.get('/historyTravelUser/:idUserReg',async(req:Request,res:Response,next:NextFunction)=>{

//     let {idUserReg}=req.params
//     console.log(req.params)
    
//     try{

//         let user=await User.findOne({where:{idUserReg:idUserReg}})

//         if(!user){
//             return res.json({menssage:'Not found user'})
//         }

//         let travel=await Travel.findAll({
//             where:{
//                 userId:user.id,

//             },
//             include:[{
//                 model:Carrier
//             }]
//         })
        

//         if(travel.length>0){
            
//             return res.json({menssage:'Found Travel',payload:travel})
//         }else{
//             return res.json({menssage:'Not found Travels'})
//         }

//     }catch(err){
//         next(err)
//     }



// })
// router.get(`/historyTravelCarrier/:idUser_Reg`,async(req:Request,res:Response,next:NextFunction)=>{

//     let {idUser_Reg}=req.params

//     try{
//         let user=await Carrier.findOne({where:{idUserReg:idUser_Reg}})//carrier 

//         if(!user){
//             return res.json({menssage:'Not found carrier'})
//         }

//         let travel=await Travel.findAll({
//             where:{
//                 carrierId:user.id//el id del carrier 
//             },
//             include:[{
//                 model:User
//             }]
        
//         })
//         if(travel.length>0){
            
//             res.json({menssage:'Found Travel',payload:travel})

//         }else{
            
           
//             return res.json({menssage:'Not found Travels'})
//         }

//     }catch(err){
//         next(err)
//     }



// })



// export default router
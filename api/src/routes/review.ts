import { Request,Response, NextFunction, Router } from "express";


import { v4 } from "uuid";
import { Truck } from "../models/Truck";
import { Review } from "../models/Review";
import { Travel } from "../models/Travel";

const router =Router()

router.post('/reviewAdmin',async(req:Request,res:Response,next:NextFunction)=>{
   

    const {idTravel,Carrrier_raiting,Admin_comment}=req.body

      

    let review= await Review.findAll({where:{travelId:idTravel}})
    

    if(!review.length){

        let newReviewForCarrier={
            id:v4(),
            Carrrier_raiting,
            Admin_comment,
            travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
        }
       
        try{

            let reviewe=await Review.create(newReviewForCarrier)
                
            return res.status(200).send({mensaje:'Review for carrier created',data:reviewe})
                
                

        }catch(err){

            next(err)
        }


    }else{
        let upDataRewie= await review[0].update({Carrrier_raiting,Admin_comment})

        return res.status(200).send({mensaje:'Review update',data:upDataRewie})
     }



})

router.post('/reportCarrier',async(req:Request,res:Response,next:NextFunction)=>{
    
    //luego q el user hace una review la pude hacer el trasportista???

    const {Carrier_report,idTravel}=req.body//review del carrier--->user

        
    let review= await Review.findAll({where:{travelId:idTravel}})

    if(!review.length){

        let newReviewCarrier={
            id:v4(),
            Carrier_report,
            
            travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
        }
        try{

            let reviewe=await Review.create(newReviewCarrier)
                
            return res.status(200).send({mensaje:'Review creada',data:reviewe})
                
                

        }catch(err){
            // console.log('llego al error', err)
            next(err)
        }


    }else{
        let upDataRewie= await review[0].update({Carrier_report})

        return res.status(200).send({mensaje:'Review update',data:upDataRewie})
    }

}
)


// router.get('/reviewCarrier/:idUser_Reg',async(req:Request,res:Response,next:NextFunction)=>{

//     const{idUser_Reg}=req.params

//     let user=await User.findAll({//tengo el id de la tabla User
//         where:{
//             idUserReg:idUser_Reg
//         }
//     })
//     if(!user.length){
//         return res.json({menssage:'not found User'})
//     }else{
//         let travel=await Travel.findAll({where:{
//             userId:user[0].id
//         }})
//         if(!travel.length){
//             return res.json({menssage:'user not travels'})
//         }
//         let ids=[]//los id de los travels

//         for(let i=0;i<travel.length;i++){

            



//             ids.push(travel[i].id)

//         }
//         // res.send(`${ids.length}`)
//         let reviews=[]

//         let j=0

//         while (j<ids.length) {
//             let review=await Review.findOne({
//                 where:{
                    
//                     travelId:ids[j]
//                 }
//             })
//             if(!review){
                
//                 j=j+1
//                 continue

//             }
//             reviews.push(review)
            
//             j=j+1




            
//         }
//         res.send(reviews)
       
//     }

    
    


// })


// router.get('/reviewUser/:idUser_Reg',async(req:Request,res:Response,next:NextFunction)=>{

//     const{idUser_Reg}=req.params

//     let carrier=await Carrier.findAll({//tengo el id de la tabla Carrier
//         where:{
//             idUserReg:idUser_Reg
//         }
//     })
//     if(!carrier.length){
//         return res.json({menssage:'not found User'})
//     }else{
//         let travel=await Travel.findAll({where:{
//             carrierId:carrier[0].id
//         }})
//         if(!travel.length){
//             return res.json({menssage:'user not travels'})
//         }
//         let ids=[]//los id de los travels

//         for(let i=0;i<travel.length;i++){

            



//             ids.push(travel[i].id)

//         }
//         // res.send(`${ids.length}`)
//         let reviews=[]

//         let j=0

//         while (j<ids.length) {
//             let review=await Review.findOne({
//                 where:{
                    
//                     travelId:ids[j]
//                 }
//             })
//             if(!review){
                
//                 j=j+1
//                 continue

//             }
//             reviews.push(review)
            
//             j=j+1




            
//         }
//         res.send(reviews)
       
//     }

    
    


// })

export default router
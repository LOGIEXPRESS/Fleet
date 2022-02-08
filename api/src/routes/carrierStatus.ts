import { Response, Request, Router, NextFunction } from 'express';
import { Truck } from '../models/Truck';
import { Signup } from '../models/Signup';
const router=Router()


// router.get('/Fleet',async(req:Request,res:Response,next:NextFunction)=>{
//     // let {role, status}=req.params

//     let carriers = await Signup.findAll({where:{role: false}, raw: true}) // me busco a todos lo conductores

//     return carriers
    // return res.send(carriers);

// })

router.get('/FleetStatus',async(req:Request,res:Response,next:NextFunction)=>{

    let {status}=req.params

<<<<<<< HEAD
    let available = await Signup.findAll({where:{
        status: true},
        raw: true
    });
    let busy = await Signup.findAll({where:{
        status: false},
        raw: true
    });;
    let absent = await Signup.findAll({where:{
=======
    let available = await Truck.findAll({where:{
        status: true},
        raw: true
    });
    let busy = await Truck.findAll({where:{
        status: false},
        raw: true
    });;
    let absent = await Truck.findAll({where:{
>>>>>>> 647926c7fd5b3f4d3054e05cd7331b28fa67ef06
        status: null},
        raw: true
    });

    if( status === 'true'){
        return res.status(200).json({"msg":"Disponibles", available})
    }else if (status === 'false'){
        return res.status(200).json({"msg":"Ocupados", busy})
    }else if (status === 'null'){
        return res.status(200).json({"msg":"Ausentes", absent})
    }else{
       let  allCarrierData = await Truck.findAll({
        include:[{
            model:Signup
        }]
       })
       return res.status(200).json({allCarrierData})
    }
})


router.get('/CarrrierDetails',async(req:Request,res:Response,next:NextFunction)=>{
    let {id}=req.params

    let carrierData = await Signup.findByPk(id) 
    let vehicleData = await Truck.findOne({where:{
        SignupId: id,
    }}) 

    let allData = {...carrierData, ...vehicleData} 

    return res.status(200).json({"msg":"Detalle", allData})
  

})



export default router



import { Response, Request, Router, NextFunction } from 'express';
import { Carrier } from '../models/Carrier';
import { Signup } from '../models/Signup';
const router=Router()


router.get('/Fleet',async(req:Request,res:Response,next:NextFunction)=>{
    // let {role, status}=req.params

    let carriers = await Signup.findAll({where:{role: false}, raw: true}) // me busco a todos lo conductores

    return carriers

})

router.get('/FleetStatus',async(req:Request,res:Response,next:NextFunction)=>{

    let {status}=req.params

    let available = await Carrier.findAll({where:{
        status: true},
        raw: true
    });
    let busy = await Carrier.findAll({where:{
        status: false},
        raw: true
    });;
    let absent = await Carrier.findAll({where:{
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
       let  allCarrierData = await Carrier.findAll({
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
    let vehicleData = await Carrier.findOne({where:{
        SignupId: id,
    }}) 

    let allData = {...carrierData, ...vehicleData} 

    return res.status(200).json({"msg":"Detalle", allData})
  

})

export default router
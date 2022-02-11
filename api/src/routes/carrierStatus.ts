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
router.post('/ChangeOn',async(req:Request,res:Response,next:NextFunction)=>{
    let {id}=req.body;

    let user = await Truck.findAll({where:{
        SignupId: id, 
    }})

    if(user){

        let upDateThis: any = {}
        
        if(user){upDateThis.status = true}
        
        //console.log(upDateThis)
       const changeStatus = await Truck.update(upDateThis, {where:{
           SignupId: id, 
       }})

    }


})

router.post('/ChangeOff',async(req:Request,res:Response,next:NextFunction)=>{
    let {id}=req.body;

    let user = await Truck.findAll({where:{
        SignupId: id, 
    }})

    if(user){

        let upDateThis: any = {}
        
        if(user){upDateThis.status = null}
        
        //console.log(upDateThis)
       const changeStatus = await Truck.update(upDateThis, {where:{
           SignupId: id, 
       }})

       return res.status(200).json({"msg":"Cambio el status", changeStatus})
    }

    
})


router.post('/StatusOn',async(req:Request,res:Response,next:NextFunction)=>{

    let {id}=req.params;

    let user = await Truck.findAll({where:{
        SignupId: id, 
    }})
    // console.log(user)

    let userStatus = user[0].status
    // console.log(userStatus)

    if (user && (userStatus!== null)){

        let upDateThis: any = {}
        
        if(userStatus){upDateThis.status = !userStatus}
        
        //console.log(upDateThis)
        const changeStatus = await Truck.update(upDateThis, {where:{
            SignupId: id, 
        }})
         //console.log(changeStatus)

        return res.status(200).json({"msg":"Cambio el status", changeStatus})

    }else if( user && (userStatus == null)){

        let upDateThis: any = {}
        
        if(userStatus){upDateThis.status = true}
        
        //console.log(upDateThis)
       const changeStatus = await Truck.update(upDateThis, {where:{
           SignupId: id, 
       }})
        //console.log(changeStatus)

       return res.status(200).json({"msg":"Cambio el status", changeStatus})

    }else{

        return res.status(404).json({"msg":"ACA ROMPE, NO ENCONTRAMOS STATUS "})
    }


})

router.get("/FleetStatus", async (req: Request, res: Response, next: NextFunction) => {

    // let {status}=req.params

    let on = await Truck.findAll({where:{
        status: true},
        raw: true
    });
    let inSevice = await Truck.findAll({where:{
        status: false},
        raw: true
    });;
    let off = await Truck.findAll({where:{
        status: null},
        raw: true
    });

    return res.status(200).json({"Fuera de servicio":off, "Disponibles":on, "Ocupados":inSevice })

    // if( on ){
    //     return res.status(200).json({"msg":"Disponibles", on})
    // }else if (inSevice){
    //     return res.status(200).json({"msg":"Ocupados", inSevice})
    // }else if (off){
    //     return res.status(200).json({"msg":"Ausentes", off})
    // }else{
    //    let  allCarrierData = await Truck.findAll({
    //     include:[{
    //         model:Signup
    //     }]
    //    })
    //    return res.status(200).json({allCarrierData})
    // }
})



router.get('/StatusAvailable',async(req:Request,res:Response,next:NextFunction)=>{
    
    let {id}=req.params;
    
    let user = await Truck.findAll({where:{
        SignupId: id, 
    }})
    
    if(user){
        
        const userStatus = user[0].status

        let upDateThis: any = {}
        //console.log(upDateThis)
        
        if(userStatus){upDateThis.status = !userStatus}
        
        const changeStatus = await Truck.update(upDateThis, {where:{
            SignupId: id, 
        }})
        

        
        return res.status(200).json({"msg":"Cambio el status", changeStatus})
        
    }
    
})

// router.get('/CarrrierDetails',async(req:Request,res:Response,next:NextFunction)=>{
//     let {id}=req.params

//     let carrierData = await Signup.findByPk(id) 
//     let vehicleData = await Truck.findOne({where:{
//         SignupId: id,
//     }}) 

//     let allData = {...carrierData, ...vehicleData} 

//     return res.status(200).json({"msg":"Detalle", allData})
// })


export default router



import { Response, Request, Router, NextFunction } from "express";
import { Truck } from "../models/Truck";
import { Signup } from "../models/Signup";
const router = Router();

router.get(
  "/Fleet",
  async (req: Request, res: Response, next: NextFunction) => {
    // let {role, status}=req.params

    let carriers = await Signup.findAll({ where: { role: false }, raw: true }); // me busco a todos lo conductores

    return res.send(carriers);
  }
);

router.get(
  "/FleetStatus",
  async (req: Request, res: Response, next: NextFunction) => {
    let { status } = req.params;

    let available = await Truck.findAll({
      where: {
        status: true,
      },
      raw: true,
    });
    let busy = await Truck.findAll({
      where: {
        status: false,
      },
      raw: true,
    });
    let absent = await Truck.findAll({
      where: {
        status: null,
      },
      raw: true,
    });

    if (status === "true") {
      return res.status(200).json({ msg: "Disponibles", available });
    } else if (status === "false") {
      return res.status(200).json({ msg: "Ocupados", busy });
    } else if (status === "null") {
      return res.status(200).json({ msg: "Ausentes", absent });
    } else {
      let allCarrierData = await Truck.findAll({
        include: [
          {
            model: Signup,
          },
        ],
      });
      return res.status(200).json({ allCarrierData });
    }
  }
);

router.get(
  "/CarrrierDetails",
  async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    let carrierData = await Signup.findByPk(id);
    let vehicleData = await Truck.findOne({
      where: {
        SignupId: id,
      },
    });

    let allData = { ...carrierData, ...vehicleData };

});

router.get('/StatusAvailable',async(req:Request,res:Response,next:NextFunction)=>{

    let {id}=req.params;

    let user = await Truck.findAll({where:{
        SignupId: id, 
    }})

    if(user){

        const userStatus = user[0].status
        //console.log(userStatus)
        //const changeStatus = !userStatus
        //console.log(changeStatus)

        let upDateThis: any = {}
         //console.log(upDateThis)

        if(userStatus){upDateThis.status = !userStatus}

        const changeStatus = await Truck.update(upDateThis, {where:{
            SignupId: id, 
        }})

        // const newStatus = changeStatus[0].status

        return res.status(200).json({"msg":"Cambio el status", changeStatus})
        
    }

})

export default router;

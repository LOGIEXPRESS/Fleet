import { Response, Request, Router, NextFunction } from 'express';
 const { Op } = require("sequelize");
 import { uuid } from 'uuidv4';
 
import { Travel } from '../models/Travel';
import { Carrier } from '../models/Carrier';
import { Signup } from '../models/Signup';
import { Truck } from '../models/Truck';
 

 var userFake=[
 {
		id: '360208c5-551c-4825-afc5-b05a0e4c9a62',
		name:"Nemesio",
		lastName:"Andara",
		password: "passwordHash",
		phone:"+584121222392",
		eMail:"NemesioAndara@gmail.com",
		role:true
	},{
		id: '0029abfb-cc79-4624-aede-aeff02ca4968',
		name:"Allan",
		lastName:"Torres",
		password: "passwordHash",
		phone:"+584121222392",
		eMail:"allaneduardot@gmail.com",
		role:false
	},{
		id: '0fe1f9b6-a3d5-4d34-8026-1e239c5a3ef9',
		name:"Eliana",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584121222392",
		eMail:"elianahenry@gmail.com",
		role:false
	},{
		id: '3840c5ad-a72d-40b7-bd27-46db1e27d481',
		name:"Facu",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584234234",
		eMail:"Facuhenry@gmail.com",
		role:false
	},{
		id: '3b44d0d9-615f-4ea3-bd81-8557b739ce00',
		name:"Luis",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+5354534554",
		eMail:"Luishenry@gmail.com",
		role:false
	},{
		id: '503296d5-4da6-4d22-a591-4a9d647ee4b4',
		name:"Gonza",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+34522323422",
		eMail:"Gonzahenry@gmail.com",
		role:false
	},{
		id: '86b689c8-6a1a-4e93-aed9-2d60b89b51ad',
		name:"Maca",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+234234234",
		eMail:"Macahenry@gmail.com",
		role:false
	},{
		id: 'b17aacfa-0bd6-4ef8-8825-4ad417082715',
		name:"Fredy",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+6534534534",
		eMail:"Fredyhenry@gmail.com",
		role:false
	},{
		id: 'b42586c3-02b3-4966-95a0-89b0b35c958d',
		name:"Matias",
		lastName:"HenryHero",
		password: "passwordHash",
		phone:"+6534534534",
		eMail:"MatiashenryHero@gmail.com",
		role:false
	},{
		id: 'e30eef12-d9e6-4eb3-82e5-3d4277ebd92c',
		name:"Franco",
		lastName:"Teacher",
		password: "passwordHash",
		phone:"+6534534534",
		eMail:"FrancoTeacherHenry@gmail.com",
		role:false
	},{
		id: 'e4457da8-be02-4757-864a-ee8a551c63c1',
		name:"Martina",
		lastName:"Teacher",
		password: "passwordHash",
		phone:"+24242334534",
		eMail:"MartinaTeacherHenry@gmail.com",
		role:false
	}
];
var carrierFake = [{			
            id:"09135748-3751-40fe-b016-a6a601cc42cc",
			 
			license: "2002022",
			brand:"Toyota",
			patent:"3e3eed3",
			model:0,
			color:"azul",
			capacity:5,
			SignupId: '0029abfb-cc79-4624-aede-aeff02ca4968'
 },{			
            id:"1b8ed2d7-1660-4fd0-a7e7-049a533d543d",
			 
			license: "11111111",
			brand:"Jeep",
			patent:"34r4r4rr",
			model:0,
			color:"amarillo",
			capacity:7,
			SignupId: '0fe1f9b6-a3d5-4d34-8026-1e239c5a3ef9'
		},{			
            id:"1cdf84c7-4096-4136-9783-463ea992b637",
		 
			license: "11111111",
			brand:"audi",
			patent:"3efef3d4r4rr",
			model:0,
			color:"negro",
			capacity:8,
			SignupId: '3840c5ad-a72d-40b7-bd27-46db1e27d481'
		},{			
            id:"236af201-b546-4b8c-bf21-28c96d5970f1",
		 
			license: "linceiaGonza",
			brand:"caliber",
			patent:"3efef3d4r4rr",
			model:0,
			color:"rojo",
			capacity:2,
			SignupId: '3b44d0d9-615f-4ea3-bd81-8557b739ce00'
		},{			
            id:"49824efe-37c5-4389-8a72-14822899dd9c",
		 
			license: "linceiaFranco",
			brand:"toyota",
			patent:"3efes4444",
			model:0,
			color:"azul",
			capacity:1,
			SignupId: '503296d5-4da6-4d22-a591-4a9d647ee4b4'
		}]
			var idUser={
            id:uuid(),
	   company:'Fletes Convaca',
       eMail: "allantorress@gmail.com", 
	   SignupId: '360208c5-551c-4825-afc5-b05a0e4c9a62'
	};
	
const router = Router()
 router.get('/uploadDataFake', async(req: Request, res: Response) => {
             const signup= await Signup.bulkCreate(userFake);
            let carrier = await Truck.bulkCreate(carrierFake);
          
  
              const admin = await Carrier.create(idUser);  
			 const obj={
				signup,
			      carrier, 
			    admin

			 }
	res.send(obj);
});




export default router;

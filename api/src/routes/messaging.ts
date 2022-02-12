import { Response, Request, Router, NextFunction } from 'express';
import { Messaging } from '../models/Messaging';
import { uuid } from 'uuidv4';
const router=Router()
const formatoDate=(cadena:any)=>{
    let newCadena=cadena.toString().split(/[-,T,:]/);
  //  let hora=newCadena[newCadena.length-3]+" "+newCadena[newCadena.length-2];
    //let fecha=newCadena[2]+" "+newCadena[1]+" "+newCadena[0];
    //let dateM=hora+" "+fecha;
   //return newCadena[0]+':'+newCadena[1];
    let sep=newCadena.toString().split(" ");
    let fecha=sep[2]+"-"+sep[1]+"-"+sep[3];
    let h=sep[4].replace(',',':');
    let hora=h.substr(0,5);
 
    return fecha+" "+hora;
    }
router.post('/messaging',async(req: Request, res: Response) => {
     const {room,messageAdmin,messageCarrier} = req.body;
     //Messaging
     
     let message = await Messaging.create({room,messageAdmin,messageCarrier})
    res.send(message);
}); 

 router.get('/findMessage', async(req: Request, res: Response) => {
     let {id}=req.query;


    let messageX=await Messaging.findAll({//tengo el id de la tabla Carrier
        where:{
            room:id
        },order:[['id','ASC']]
    })
    let author:any;
    let message:any;
    
    let resp:any=[];
    for(let i=0;i<messageX.length;i++){ 
      if(messageX[i].messageCarrier){
        author="Transportista";
        message=messageX[i].messageCarrier;
        }
        if(messageX[i].messageAdmin){
        author="Administrador";
        message=messageX[i].messageAdmin;
        }
        let fecha=formatoDate(messageX[i].createdAt);
         resp[i]={
          room:messageX[i].room,
          author:author,
          message:message,
          time:fecha
          
        }
}
console.log(resp[0].time);
    res.send(resp);
});
export default router;	
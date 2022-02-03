import { Response, Request, Router, NextFunction } from 'express';

import { uuid } from 'uuidv4';
import { Admin } from '../models/Admin';
import { Carrier } from '../models/Carrier';
import { Signup } from '../models/Signup';





const router = Router()

//ruta para perfil de admin donde carga el nombre de la compania y los mails de los ususarios
router.post('/adminProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al user profile')

	const { idSignUp, company,eMail/*array*/ } = req.body

    if(idSignUp){
        try {

         

            let newProfile = {
                id: uuid(),
                company,
                eMail,
                SignupId:idSignUp,
            
            }
    
            let profileAdmin=await Admin.create(newProfile)
            
    
            return res.json({menssage:'perfil add',payload:profileAdmin})
            
    
    
        } catch (err) {
            next(err)
        }
    

    }
    return res.send(`id enviado: ${idSignUp}`)
	

});


//rutas para obtener los mails de los usuarios a partir del id que se genera al registrarse el admin
router.get('/emailsCarriers/:id',async(req:Request,res:Response,next:NextFunction)=>{

    const {id}=req.params

    try{

        let emails= await Admin.findOne({
            where:{

                SignupId:id
            },
            attributes: {exclude: ['id','company','updatedAt','createdAt','SignupId']}
            
        })
        if(emails){
            return res.json({menssage:'email',payload:emails})
        }
        res.send('not found emails')

    }catch(err){
        next(err)
    }

})


//ruta para poder mostrar el perfil del administrador a partir del id q se generea al registrarce 
router.get('/adminProfile/:id',async(req:Request,res:Response,next:NextFunction)=>{

    const{ id }=req.params

    if(id){

        try{
            let admin= await Signup.findByPk(id)


            if(admin){
                return res.json({menssage:'admin',payload:admin})

            }
            res.json({menssage:`admin not found id:${id}`})


        }catch(err){
            next(err)
        }
    }
    return res.send(`id: ${id}`)



})


//ruta para poder mostrar los datos de la empresa del administador a partir del id q se generea al registrarce 
router.get('/adminData/:id',async(req:Request,res:Response,next:NextFunction)=>{

    const{ id }=req.params

    if(id){

        try{
            let data= await Admin.findOne({where:{

                SignupId:id
            }})
            

            if(data){
                return res.json({menssage:'admin Data',payload:data})

            }
            res.json({menssage:`admin Data not found id:${id}`})


        }catch(err){
            next(err)
        }
    }
    return res.send(`id: ${id}`)



})


//ruta para completar tabla carrier 
router.post('/carrierProfile', async (req: Request, res: Response, next: NextFunction) => {
	
	const {idSignUp ,
        //track
        license ,brand ,patent ,model ,color ,capacity,
        //datos carrier
        identification,photo,phone,secret,cbu} = req.body

    if(idSignUp){
        try {		

            let newProfileCarrier = {
                id:uuid(),
                license,
                brand,
                patent,
                model,
                color,
                capacity,
                cbu,
                SignupId:idSignUp
            }
            let signUpCarrier={
                identification,
                photo,
                phone,
                secret
                
            }
            
            let carrier = await Carrier.create(newProfileCarrier)

            let upDataSignUpCarrier= await Signup.update({
                identification,
                photo,
                phone,
                secret
            },
           { where:{
                id:idSignUp
            }})
            // .then(async(c)=>{
            //     if(!c){
            //         return res.send('carrier not found')
            //     }
            //     await c.update({identification})
            // })
            // if(!upDataSignUpCarrier){
            //     return res.send('carrier not found')
            // }
            // await upDataSignUpCarrier.update({identification,photo,secret})

            return res.json({menssage:'carrier created',payload:carrier})

        
        } catch (err) {
            next(err)
        }



    }
    return res.send(`id: ${idSignUp}`)
    



});



export default router
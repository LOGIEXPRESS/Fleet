import { Router } from 'express';
import  prueba  from "./prueba";
import signUp from "./signup"
import login from './login'
import profileAdmin from './profiles'
import review from './review'
const router = Router();

// router.use('/', dataFake)

//router.use('/', UploadDataFake) 

router.use("/", prueba)

router.use("/",signUp)

router.use('/',login)

router.use('/',profileAdmin)

router.use('/',review)

export default router;

import { Router } from 'express';
import  prueba  from "./prueba";
import signUp from "./signup"
import login from './login'

import profileAdmin from './profiles'
import review from './review'
import registerfleet from './registerfleet'
import uploadDataFake from './uploadDataFake'
import travel from './travel'
const router = Router();

// router.use('/', dataFake)

 router.use('/', uploadDataFake) 

router.use("/", prueba)

router.use("/",signUp)

router.use('/',login)

router.use('/',profileAdmin)
router.use('/',registerfleet)
router.use('/',travel)

router.use('/',review)

export default router;

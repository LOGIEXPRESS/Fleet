import { Router } from 'express';
import prueba from "./prueba";
import signUp from "./signup"
import login from './login'
import carrierStatus from './carrierStatus'
import profileAdmin from './profiles'
import review from './review'
import registerfleet from './registerfleet'
import uploadDataFake from './uploadDataFake'
import travel from './travel'
import edits from './edits'
import changePassword from './changePass'
import logout from './logout'
import payment from './payment'
import recoverPass from './recoverPassword'
import messaging  from './messaging';
 
const router = Router();




router.use('/', payment)
router.use('/', messaging)
router.use('/', carrierStatus)

router.use('/', uploadDataFake)

router.use("/", prueba)

router.use("/", signUp)

router.use('/', login)

router.use('/', profileAdmin)

router.use('/', registerfleet)

router.use('/', travel)

router.use('/', edits)

router.use('/', changePassword)

router.use('/', logout)

router.use('/', review)

router.use('/',recoverPass)

router.use('/', payment)

export default router;

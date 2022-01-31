import { Router } from 'express';

import  prueba  from "./prueba";
const router = Router();

// router.use('/', dataFake)

//router.use('/', UploadDataFake) 

router.use("/", prueba)

export default router;

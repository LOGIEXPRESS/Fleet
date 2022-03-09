import { Response , Request , Router , NextFunction } from "express";

import { Contacts } from "../models/Contacts";

const router = Router()

router.post('/contact',async (req:Request , res: Response, next: NextFunction) => {
    try {
        const { name , email , description} = req.body

        await Contacts.create({ name , email , description})

        res.json({menssage:'contact created'})
    } catch (error) {
        next(error)
    }
})
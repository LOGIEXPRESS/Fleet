import { Response, Request, Router, NextFunction } from 'express';

const router = Router()

router.get('/prueba', async (req: Request, res: Response, next: NextFunction) => {
    
    
    try {
            res.send("ESTO ES UNA PRUEBA")
    }
    catch (err) {
        next(err)
    }
});

export default router
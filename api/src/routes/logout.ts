import { Response, Request, Router, NextFunction } from 'express';

import passport from 'passport';
import jwt from 'jsonwebtoken'


const router=Router()

router.get('/logout', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    req.logOut()
    res.json({ user: { username: '', role: '' }, success: true });
}); 

export default router;	
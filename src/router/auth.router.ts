import { Response, NextFunction, Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';
import { config } from '../config';
import { IRequestExtended } from '../interfaces';

const router = Router();

router.post('/login', userMiddleware.validateLoginUser, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', (req: IRequestExtended, res : Response, next: NextFunction) => {
    req.tokenType = config.TYPE_ACCESS;
    next();
}, authMiddleware.checkToken, authController.logout);
router.post('/refresh', (req: IRequestExtended, res : Response, next: NextFunction) => {
    req.tokenType = config.TYPE_REFRESH;
    next();
}, authMiddleware.checkToken, authController.refresh);

export const authRouter = router;

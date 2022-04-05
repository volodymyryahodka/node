import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { config } from '../config';

class AuthMiddleware {
    public async checkToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new Error('No token');
            }

            const { tokenType } = req;

            const tokenPairFromDb = await tokenRepository.findByParams(
                tokenType === config.TYPE_ACCESS
                    ? { accessToken: token }
                    : { refreshToken: token },
            );

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const { userEmail } = await tokenService.verifyToken(token, tokenType);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

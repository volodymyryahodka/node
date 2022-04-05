import { Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    public async refresh(req: IRequestExtended, res: Response): Promise<void | Error> {
        try {
            const { id, email } = req.user as IUser;

            await tokenService.deleteUserTokenPair(id);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();

import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { paramsValidators, userValidators } from '../validators';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                throw new Error('wrong email or password');
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    async checkIsUserExistForCreate(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, phone } = req.body;
            const userFromDb = await userRepository.getUserByEmailOrPhone(email, phone);

            if (userFromDb) {
                throw new Error('Введи нормальні дані, дурачок)');
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    async validateCreateUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidators.createUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateLoginUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = userValidators.loginUser.validate(req.body);

            if (error) {
                throw new Error('wrong email or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async validateId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = paramsValidators.id.validate(req.params);

            if (error) {
                throw new Error('wrong email or password');
            }

            req.body = value;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();

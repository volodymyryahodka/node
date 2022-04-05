"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const repositories_1 = require("../repositories");
const validators_1 = require("../validators");
class UserMiddleware {
    async checkIsUserExist(req, res, next) {
        try {
            const userFromDb = await repositories_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDb) {
                throw new Error('wrong email or password');
            }
            req.user = userFromDb;
            next();
        }
        catch (e) {
            res.status(400)
                .json(e.message);
        }
    }
    async checkIsUserExistForCreate(req, res, next) {
        try {
            const { email, phone } = req.body;
            const userFromDb = await repositories_1.userRepository.getUserByEmailOrPhone(email, phone);
            if (userFromDb) {
                throw new Error('Введи нормальні дані, дурачок)');
            }
            next();
        }
        catch (e) {
            res.status(400)
                .json(e.message);
        }
    }
    async validateCreateUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.createUser.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async validateLoginUser(req, res, next) {
        try {
            const { error, value } = validators_1.userValidators.loginUser.validate(req.body);
            if (error) {
                throw new Error('wrong email or password');
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async validateId(req, res, next) {
        try {
            const { error, value } = validators_1.paramsValidators.id.validate(req.params);
            if (error) {
                throw new Error('wrong email or password');
            }
            req.body = value;
            next();
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=user.middleware.js.map
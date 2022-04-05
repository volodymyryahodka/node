"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const config_1 = require("../config");
class AuthMiddleware {
    async checkToken(req, res, next) {
        try {
            const token = req.get('Authorization');
            if (!token) {
                throw new Error('No token');
            }
            const { tokenType } = req;
            const tokenPairFromDb = await repositories_1.tokenRepository.findByParams(tokenType === config_1.config.TYPE_ACCESS
                ? { accessToken: token }
                : { refreshToken: token });
            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }
            const { userEmail } = await services_1.tokenService.verifyToken(token, tokenType);
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                throw new Error('Token not valid');
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=auth.middleware.js.map
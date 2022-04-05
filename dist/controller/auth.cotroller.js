"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const repositories_1 = require("../repositories");
class AuthController {
    async logout(req, res) {
        const { id } = req.user;
        await services_1.tokenService.deleteUserTokenPair(id);
        return res.json('Ok');
    }
    async login(req, res) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.userService.compareUserPasswords(password, hashPassword);
            const { refreshToken, accessToken } = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }
    async refresh(req, res) {
        try {
            const { id, email } = req.user;
            await services_1.tokenService.deleteUserTokenPair(id);
            const { refreshToken, accessToken } = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            await repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=auth.cotroller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_service_1 = require("./user.service");
const token_service_1 = require("./token.service");
class AuthService {
    async registration(body) {
        const { email } = body;
        const user = await user_service_1.userService.getUserByEmail(email);
        if (user) {
            throw new Error(`User with this email: ${email} already exist`);
        }
        const createdUser = await user_service_1.userService.createUser(body);
        return this._getTokenData(createdUser);
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const { refreshToken, accessToken } = await token_service_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
        await token_service_1.tokenService.saveToken(id, refreshToken, accessToken);
        return {
            accessToken,
            refreshToken,
            userId: id,
            userEmail: email,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
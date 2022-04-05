"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
const config_1 = require("../config");
class UserService {
    async getUsers() {
        return repositories_1.userRepository.getUsers();
    }
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return repositories_1.userRepository.createUser(dataToSave);
    }
    async getUserByEmail(email) {
        return repositories_1.userRepository.getUserByEmail(email);
    }
    async updateUser(id, password, email) {
        return repositories_1.userRepository.updateUser(+id, password, email);
    }
    async deleteUser(id) {
        return repositories_1.userRepository.deleteUser(+id);
    }
    async compareUserPasswords(password, hash) {
        const isPasswordUnique = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('wrong email or password');
        }
    }
    _hashPassword(password) {
        return bcrypt_1.default.hash(password, Number(config_1.config.USER_SALT_ROUNDS));
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map
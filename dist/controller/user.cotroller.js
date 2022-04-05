"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async getUsers(req, res) {
        const users = await services_1.userService.getUsers();
        return res.json(users);
    }
    async createUser(req, res) {
        const createdUser = await services_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUserByEmail(req, res) {
        const { email } = req.body;
        const user = await services_1.userService.getUserByEmail(email);
        return res.json(user);
    }
    async updateUser(req, res) {
        const { email, password, } = req.body;
        const { id } = req.params;
        const updatedUser = await services_1.userService.updateUser(id, password, email);
        return res.json(updatedUser);
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        const deletedUser = await services_1.userService.deleteUser(id);
        return res.json(deletedUser);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.cotroller.js.map
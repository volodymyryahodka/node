"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async getUsers() {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User).find();
    }
    async getUserByEmail(email) {
        // @ts-ignore
        return (0, typeorm_1.getManager)().getRepository(entity_1.User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
    async getUserByEmailOrPhone(email, phone) {
        // @ts-ignore
        return (0, typeorm_1.getManager)().getRepository(entity_1.User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .orWhere('user.phone = :phone', { phone })
            .getOne();
    }
    async createUser(user) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.User).save(user);
    }
    async updateUser(id, password, email) {
        return (0, typeorm_1.getManager)()
            .getRepository(entity_1.User)
            .update({ id }, {
            password,
            email,
        });
    }
    async deleteUser(id) {
        return (0, typeorm_1.getManager)()
            .getRepository(entity_1.User)
            .delete({ id });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.User)
], UserRepository);
// @ts-ignore
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map
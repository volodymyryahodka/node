"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    async createComments(comment) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Comment).save(comment);
    }
    async getUserComments(id) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }
    async getQueryRunner() {
        return (0, typeorm_1.getManager)().getRepository(entity_1.Comment);
    }
    async getComment(queryRunner, id) {
        return queryRunner.createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
    }
    async setLike(queryRunner, comment, id) {
        return queryRunner.update({ id }, { like: comment.like + 1 });
    }
    async setDislike(queryRunner, comment, id) {
        return queryRunner.update({ id }, { dislike: comment.dislike + 1 });
    }
};
CommentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.Comment)
], CommentRepository);
// @ts-ignore
exports.commentRepository = new CommentRepository();
//# sourceMappingURL=comment.repository.js.map
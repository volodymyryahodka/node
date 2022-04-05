"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const repositories_1 = require("../repositories");
class CommentService {
    async createComment(comment) {
        return repositories_1.commentRepository.createComments(comment);
    }
    async getUserComments(id) {
        return repositories_1.commentRepository.getUserComments(+id);
    }
    async setLikeDislike(action, commentId) {
        const queryRunner = await repositories_1.commentRepository.getQueryRunner();
        const comment = await repositories_1.commentRepository.getComment(queryRunner, commentId);
        if (!comment) {
            throw new Error('wrong comment ID');
        }
        if (action === 'like') {
            return repositories_1.commentRepository.setLike(queryRunner, comment, commentId);
        }
        if (action === 'dislike') {
            return repositories_1.commentRepository.setDislike(queryRunner, comment, commentId);
        }
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=comment.service.js.map
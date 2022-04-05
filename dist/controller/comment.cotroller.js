"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const services_1 = require("../services");
class CommentController {
    async createComment(req, res) {
        const createdComment = await services_1.commentService.createComment(req.body);
        return res.json(createdComment);
    }
    async getUserComments(req, res) {
        const { id } = req.params;
        const userComments = await services_1.commentService.getUserComments(id);
        return res.json(userComments);
    }
    async setLikeDislike(req) {
        const { action, commentId } = req.body;
        return services_1.commentService.setLikeDislike(action, commentId);
    }
}
exports.commentController = new CommentController();
//# sourceMappingURL=comment.cotroller.js.map
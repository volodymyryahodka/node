"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const services_1 = require("../services");
class PostController {
    async createPost(req, res) {
        const createdPost = await services_1.postService.createPost(req.body);
        return res.json(createdPost);
    }
    async getUserPosts(req, res) {
        const { id } = req.params;
        const posts = await services_1.postService.getUserPosts(id);
        return res.json(posts);
    }
    async updatePost(req, res) {
        const { title, text } = req.body;
        const { id } = req.params;
        const updatedPost = await services_1.postService.updatePost(id, title, text);
        return res.json(updatedPost);
    }
}
exports.postController = new PostController();
//# sourceMappingURL=post.cotroller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const repositories_1 = require("../repositories");
class PostService {
    async createPost(post) {
        return repositories_1.postRepository.createPost(post);
    }
    async getUserPosts(id) {
        return repositories_1.postRepository.getUserPosts(+id);
    }
    async updatePost(id, title, text) {
        return repositories_1.postRepository.updatePost(+id, title, text);
    }
}
exports.postService = new PostService();
//# sourceMappingURL=post.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.post('/', controller_1.postController.createPost);
router.get('/:userId', controller_1.postController.getUserPosts);
router.patch('/:postId', controller_1.postController.updatePost);
exports.postRouter = router;
//# sourceMappingURL=post.router.js.map
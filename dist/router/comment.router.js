"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.post('/', controller_1.commentController.createComment);
router.get('/:userId', controller_1.commentController.getUserComments);
router.post('/action', controller_1.commentController.setLikeDislike);
exports.commentRouter = router;
//# sourceMappingURL=comment.router.js.map
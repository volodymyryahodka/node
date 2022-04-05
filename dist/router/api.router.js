"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const user_router_1 = require("./user.router");
const post_router_1 = require("./post.router");
const comment_router_1 = require("./comment.router");
const auth_router_1 = require("./auth.router");
const router = (0, express_1.Router)();
router.use('/users', user_router_1.userRouter);
router.use('/posts', post_router_1.postRouter);
router.use('/comments', comment_router_1.commentRouter);
router.use('/auth', auth_router_1.authRouter);
exports.apiRouter = router;
//# sourceMappingURL=api.router.js.map
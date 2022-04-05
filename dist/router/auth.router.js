"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post('/login', middlewares_1.userMiddleware.validateLoginUser, middlewares_1.userMiddleware.checkIsUserExist, controller_1.authController.login);
router.post('/logout', (req, res, next) => {
    req.tokenType = config_1.config.TYPE_ACCESS;
    next();
}, middlewares_1.authMiddleware.checkToken, controller_1.authController.logout);
router.post('/refresh', (req, res, next) => {
    req.tokenType = config_1.config.TYPE_REFRESH;
    next();
}, middlewares_1.authMiddleware.checkToken, controller_1.authController.refresh);
exports.authRouter = router;
//# sourceMappingURL=auth.router.js.map
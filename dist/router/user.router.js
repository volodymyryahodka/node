"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', controller_1.userController.getUsers);
router.post('/', middlewares_1.userMiddleware.validateCreateUser, middlewares_1.userMiddleware.checkIsUserExistForCreate, controller_1.userController.createUser);
router.patch('/:id', middlewares_1.userMiddleware.validateId, controller_1.userController.updateUser);
router.delete('/:id', middlewares_1.userMiddleware.validateId, controller_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=user.router.js.map
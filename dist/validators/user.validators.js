"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const Joi = __importStar(require("joi"));
const constants_1 = require("../constants");
exports.userValidators = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(100),
        phone: Joi
            .string()
            .regex(constants_1.regexp.PHONE)
            .required(),
        email: Joi
            .string()
            .regex(constants_1.regexp.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(constants_1.regexp.PASSWORD)
            .required(),
    }),
    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(constants_1.regexp.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(constants_1.regexp.PASSWORD)
            .required(),
    }),
};
//# sourceMappingURL=user.validators.js.map
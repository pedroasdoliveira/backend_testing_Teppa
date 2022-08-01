"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const blog_controller_1 = __importDefault(require("./controllers/blog.controller"));
const router = (0, express_1.Router)();
const register = router.post('/register', blog_controller_1.default.registerUser);
module.exports = {
    register
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const cors_1 = require("cors");
const env_config_1 = require("./config/env.config");
const http_config_1 = require("./config/http.config");
const app = (0, express_1.default)();
const BASE_PATH = env_config_1.Env.BASE_PATH;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: env_config_1.Env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.get("/", (req, res, next) => {
    res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Welcome to AI Finance Platform Backend!",
    });
});
app.listen(env_config_1.Env.PORT, () => {
    console.log(`Server is running on port ${env_config_1.Env.PORT} in ${env_config_1.Env.NODE_ENV} mode`);
});
//# sourceMappingURL=index.js.map
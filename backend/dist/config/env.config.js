"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const get_env_1 = require("../utils/get_env");
const envConfig = () => ({
    NODE_ENV: (0, get_env_1.getEnv)("NODE_ENV", "development"),
    PORT: (0, get_env_1.getEnv)("PORT", "8000"),
    BASE_URL: (0, get_env_1.getEnv)("BASE_PATH", "/api"),
    MONGO_URI: (0, get_env_1.getEnv)("MONGO_URI"),
    JWT_SECRET: (0, get_env_1.getEnv)("JWT_SECRET", "secret_jwt"),
    JWT_EXPIRES_IN: (0, get_env_1.getEnv)("JWT_EXPIRES_IN", "15m"),
    JWT_REFRESH_SECRET: (0, get_env_1.getEnv)("JWT_REFRESH_SECRET", "secret_rjwt_refresh"),
    JWT_REFRESH_EXPIRES_IN: (0, get_env_1.getEnv)("JWT_REFRESH_EXPIRES_IN", "7d"),
    GEMINI_API_KEY: (0, get_env_1.getEnv)("GEMINI_API_KEY"),
    FRONTEND_ORIGIN: (0, get_env_1.getEnv)("FRONTEND_ORIGIN", "localhost"),
});
exports.Env = envConfig();
//# sourceMappingURL=env.config.js.map
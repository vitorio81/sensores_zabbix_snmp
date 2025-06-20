"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const ContrllerGetSensores_1 = require("./controller/ContrllerGetSensores");
const env_1 = require("./config/env");
require("./services/SnmpAgent");
const app = (0, express_1.default)();
const PORT = env_1.config.port;
;
app.listen(PORT, () => {
    console.log(`✅ Servidor iniciado no http://localhost:${PORT}`);
    ContrllerGetSensores_1.TemperatureChecker.start(); // Inicia verificação de temperatura
});

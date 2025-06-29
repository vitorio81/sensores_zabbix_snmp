// src/server.ts
import express from "express";
import { TemperatureChecker } from "./controller/ContrllerGetSensores";
import { config } from "./config/env";
import "./services/SnmpAgent"

const app = express();
const PORT = config.port;;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado no http://localhost:${PORT}`);
  TemperatureChecker.start(); // Inicia verificação de temperatura
});

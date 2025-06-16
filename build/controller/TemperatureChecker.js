"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureChecker = void 0;
const AuthApi_1 = require("../services/AuthApi");
const ModelRequestAuth_1 = require("../model/ModelRequestAuth");
const ControllerSensorToZabbix_1 = require("./ControllerSensorToZabbix");
const SENSOR_IDS = [
    "sensor.monitor_temperatura_jardins_aju_temperatura",
    "sensor.monitor_de_temperatura_itabaiana_temperatura",
];
class TemperatureChecker {
    static start(intervalMs = 60000) {
        console.log("⏳ Iniciando verificação de temperatura...");
        const check = () => __awaiter(this, void 0, void 0, function* () {
            console.log("🔍 Verificando sensores...");
            const authData = {};
            for (const sensorId of SENSOR_IDS) {
                try {
                    const payload = ModelRequestAuth_1.RequestAuthPayload.create(sensorId);
                    console.log(payload.url);
                    const data = yield AuthApi_1.AuthApi.authenticate(payload);
                    if (!data) {
                        throw new Error(`Nenhum dado retornado para o sensor ${sensorId}`);
                    }
                    console.log(data);
                    const currentTemperature = Number(data.state);
                    if (!isNaN(currentTemperature)) {
                        console.log(`✅ Sensor ${sensorId} - Temperatura atual: ${currentTemperature}°C`);
                        authData[sensorId] = currentTemperature.toString();
                    }
                    else {
                        console.warn(`⚠️ Temperatura inválida para o sensor ${sensorId}:`, data.state);
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(`❌ Erro ao verificar ${sensorId}:`, error.message);
                    }
                    else {
                        console.error(`❌ Erro ao verificar ${sensorId}:`, error);
                    }
                }
            }
            // Só faz login se pelo menos um sensor retornou temperatura válida
            if (Object.keys(authData).length > 0) {
                yield ControllerSensorToZabbix_1.ControllerSensorToZabbix.process({ authData });
            }
            else {
                console.warn("⚠️ Nenhuma temperatura válida coletada. Login não será realizado.");
            }
        });
        check();
        setInterval(check, intervalMs);
    }
}
exports.TemperatureChecker = TemperatureChecker;

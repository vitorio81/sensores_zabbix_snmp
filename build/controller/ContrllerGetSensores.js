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
const ModelRequestSensores_1 = require("../model/ModelRequestSensores");
const GetSensores_1 = require("../services/GetSensores");
const DataSensores_1 = require("../model/DataSensores");
class TemperatureChecker {
    static start() {
        return __awaiter(this, arguments, void 0, function* (intervalMs = 60000) {
            console.log("⏳ Iniciando verificação dos sensores..");
            const execute = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log("🔍 Verificando sensores...");
                    const payload = yield ModelRequestSensores_1.RequestSensoresPayload.create();
                    const data = yield GetSensores_1.AuthApi.authenticate(payload);
                    const filtered = data.filter((item) => item.entity_id.endsWith("temperatura") ||
                        item.entity_id.endsWith("umidade"));
                    const authData = {};
                    filtered.forEach((item) => {
                        authData[item.entity_id] = item.state;
                    });
                    for (const [sensorId, temperatura] of Object.entries(authData)) {
                        DataSensores_1.sensorsData[sensorId] = temperatura;
                        for (const [id, value] of Object.entries(DataSensores_1.sensorsData)) {
                            console.log(`Sensor ${id} - Temperatura: ${value}`);
                        }
                    }
                }
                catch (error) {
                    console.error("Erro ao verificar sensores:", error);
                }
                finally {
                    setTimeout(execute, intervalMs); // agenda a próxima execução
                }
            });
            execute(); // inicia o ciclo
        });
    }
}
exports.TemperatureChecker = TemperatureChecker;

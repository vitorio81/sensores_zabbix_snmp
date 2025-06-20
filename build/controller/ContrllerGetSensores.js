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
const FileService_1 = require("../services/FileService");
class TemperatureChecker {
    static start() {
        return __awaiter(this, arguments, void 0, function* (intervalMs = 60000) {
            console.log("⏳ Iniciando verificação dos sensores...");
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
                    for (const [sensorId, value] of Object.entries(authData)) {
                        DataSensores_1.sensorsData[sensorId] = value;
                    }
                    // Agora chama o serviço para gravar os arquivos
                    TemperatureChecker.writeSensorFiles(DataSensores_1.sensorsData);
                    // Log para conferência
                    console.log("📋 Dados atualizados:");
                    for (const [id, value] of Object.entries(DataSensores_1.sensorsData)) {
                        console.log(`Sensor ${id} -> Valor: ${value}`);
                    }
                }
                catch (error) {
                    console.error("❌ Erro ao verificar sensores:", error);
                }
                finally {
                    setTimeout(execute, intervalMs);
                }
            });
            execute();
        });
    }
    static writeSensorFiles(data) {
        const sensoresMap = {
            "temp_jardins.txt": "sensor.monitor_temperatura_jardins_aju_temperatura",
            "umid_jardins.txt": "sensor.monitor_temperatura_jardins_aju_umidade",
            "temp_itabaiana.txt": "sensor.monitor_de_temperatura_itabaiana_temperatura",
            "umid_itabaiana.txt": "sensor.monitor_de_temperatura_itabaiana_umidade",
        };
        for (const [fileName, sensorId] of Object.entries(sensoresMap)) {
            const value = data[sensorId] || "0";
            FileService_1.FileService.writeFile(fileName, value.toString());
        }
    }
}
exports.TemperatureChecker = TemperatureChecker;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_snmp_1 = __importDefault(require("net-snmp"));
const DataSensores_1 = require("../model/DataSensores");
// Mapeamento OID -> sensorId
const sensorOids = {
    "1.3.6.1.4.1.53864.1.1.0": "sensor.monitor_temperatura_jardins_aju_temperatura",
    "1.3.6.1.4.1.53864.1.2.0": "sensor.monitor_temperatura_jardins_aju_umidade",
    "1.3.6.1.4.1.53864.1.3.0": "sensor.monitor_de_temperatura_itabaiana_temperatura",
    "1.3.6.1.4.1.53864.1.4.0": "sensor.monitor_de_temperatura_itabaiana_umidade",
    // Adicione mais sensores se desejar
};
// Cria o agente SNMP
// @ts-ignore
const agent = net_snmp_1.default.createAgent({ port: 161 }, (error, data) => {
    if (error) {
        console.error("Erro no SNMP Agent:", error);
    }
});
// Registra os sensores
for (const [oid, sensorId] of Object.entries(sensorOids)) {
    agent.registerProvider({
        name: sensorId,
        oid,
        type: net_snmp_1.default.ObjectType.OctetString,
        get: (provider, request) => {
            const value = DataSensores_1.sensorsData[sensorId] || "0";
            console.log(`Consulta SNMP -> ${sensorId}: ${value}`);
            request.done(value.toString());
        },
    });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_snmp_1 = __importDefault(require("net-snmp"));
const DataSensores_1 = require("../model/DataSensores");
// Função para gerar OIDs automaticamente a partir do índice
function generateOid(index) {
    // Exemplo: base OID + índice incremental
    return `1.3.6.1.4.1.53864.1.${index}.0`;
}
const agent = net_snmp_1.default.createAgent();
const registeredSensors = new Set();
function registerNewSensors() {
    const sensorIds = Object.keys(DataSensores_1.sensorsData);
    sensorIds.forEach((sensorId, idx) => {
        if (!registeredSensors.has(sensorId)) {
            const oid = generateOid(idx + 1);
            agent.registerProvider({
                oid,
                type: net_snmp_1.default.ObjectType.OctetString,
                get: function (provider, request) {
                    const value = DataSensores_1.sensorsData[sensorId] || "0";
                    request.done(net_snmp_1.default.pdu.varbinds([
                        {
                            oid,
                            type: net_snmp_1.default.ObjectType.OctetString,
                            value: value.toString(),
                        },
                    ]));
                },
            });
            registeredSensors.add(sensorId);
            console.log(`Registrado sensor ${sensorId} no OID ${oid}`);
        }
    });
}
// Checa e registra novos sensores a cada 10 segundos
setInterval(registerNewSensors, 300000);
agent.listen({ family: "udp4", port: 161 });
console.log("Agente SNMP rodando na porta 161");

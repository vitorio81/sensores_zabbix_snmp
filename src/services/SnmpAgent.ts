import snmp from "net-snmp";
import { sensorsData } from "../model/DataSensores";

// Interfaces para tipagem mínima
interface SNMPRequest {
  done: (value: string | number) => void;
}

interface SNMPProvider {
  oid: string;
  type: number;
}

// Mapeamento OID -> sensorId
const sensorOids: { [oid: string]: string } = {
  "1.3.6.1.4.1.53864.1.1.0":
    "sensor.monitor_temperatura_jardins_aju_temperatura",
  "1.3.6.1.4.1.53864.1.2.0": "sensor.monitor_temperatura_jardins_aju_umidade",
  "1.3.6.1.4.1.53864.1.3.0":
    "sensor.monitor_de_temperatura_itabaiana_temperatura",
  "1.3.6.1.4.1.53864.1.4.0": "sensor.monitor_de_temperatura_itabaiana_umidade",
  // Adicione mais sensores se desejar
};

// Cria o agente SNMP
// @ts-ignore
const agent = snmp.createAgent({}, (error, data) => {
  if (error) {
    console.error("Erro no SNMP Agent:", error);
  }
});

// Registra os sensores
for (const [oid, sensorId] of Object.entries(sensorOids)) {
  agent.registerProvider({
    name: sensorId,
    oid,
    type: snmp.ObjectType.OctetString,
    get: (provider: SNMPProvider, request: SNMPRequest) => {
      const value = sensorsData[sensorId] || "0";
      console.log(`Consulta SNMP -> ${sensorId}: ${value}`);
      request.done(value.toString());
    },
  });
}


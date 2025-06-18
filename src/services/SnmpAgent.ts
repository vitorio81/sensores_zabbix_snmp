import snmp from "net-snmp";
import { sensorsData } from "../model/DataSensores";

// Função para gerar OIDs automaticamente a partir do índice
function generateOid(index: number): string {
  // Exemplo: base OID + índice incremental
  return `1.3.6.1.4.1.53864.1.${index}.0`;
}

const agent = snmp.createAgent();
const registeredSensors = new Set<string>();

function registerNewSensors() {
  const sensorIds = Object.keys(sensorsData);

  sensorIds.forEach((sensorId, idx) => {
    if (!registeredSensors.has(sensorId)) {
      const oid = generateOid(idx + 1);
      agent.registerProvider({
        oid,
        type: snmp.ObjectType.OctetString,
        get: function (provider: any, request: { done: (arg0: any) => void; }) {
          const value = sensorsData[sensorId] || "0";
          request.done(
            snmp.pdu.varbinds([
              {
                oid,
                type: snmp.ObjectType.OctetString,
                value: value.toString(),
              },
            ])
          );
        },
      });
      registeredSensors.add(sensorId);
      console.log(`Registrado sensor ${sensorId} no OID ${oid}`);
    }
  });
}

// Checa e registra novos sensores a cada 10 segundos
setInterval(registerNewSensors, 10000);

agent.listen({ family: "udp4", port: 161 });
console.log("Agente SNMP rodando na porta 161");

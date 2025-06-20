import { RequestSensoresPayload } from "../model/ModelRequestSensores";
import { AuthApi } from "../services/GetSensores";
import { sensorsData } from "../model/DataSensores";

interface Request {
  authData?: {
    [sensorId: string]: string;
  };
}

export class TemperatureChecker {
  static async start(intervalMs = 60000) {
    console.log("⏳ Iniciando verificação dos sensores..");

    const execute = async () => {
      try {
        console.log("🔍 Verificando sensores...");
        const payload = await RequestSensoresPayload.create();
        const data = await AuthApi.authenticate(payload);

        const filtered = data.filter(
          (item: any) =>
            item.entity_id.endsWith("temperatura") ||
            item.entity_id.endsWith("umidade")
        );

        const authData: { [sensorId: string]: string } = {};
        filtered.forEach((item: any) => {
          authData[item.entity_id] = item.state;
        });
        for (const [sensorId, temperatura] of Object.entries(authData) as [
          string,
          string
        ][]) {
          sensorsData[sensorId] = temperatura;
        }

        // Agora imprime só uma vez a lista completa
        for (const [id, value] of Object.entries(sensorsData)) {
          console.log(`Sensor ${id} - Temperatura: ${value}`);
        }
      } catch (error) {
        console.error("Erro ao verificar sensores:", error);
      } finally {
        setTimeout(execute, intervalMs); // agenda a próxima execução
      }
    };

    execute(); // inicia o ciclo
  }
}

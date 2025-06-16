import { RequestSensoresPayload } from "../model/ModelRequestSensores";
import { AuthApi } from "../services/GetSensores";
import { ControllerSensorToZabbix } from "./ControllerSensorToZabbix";

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

        await ControllerSensorToZabbix.process({ authData });
      } catch (error) {
        console.error("Erro ao verificar sensores:", error);
      } finally {
        setTimeout(execute, intervalMs); // agenda a próxima execução
      }
    };

    execute(); // inicia o ciclo
  }

  // Exemplo de próxima função
  static proximaFuncao(request: Request) {
    console.log("Sensores filtrados:", request.authData);
    // ...faça o que precisar com os sensores filtrados
  }
}

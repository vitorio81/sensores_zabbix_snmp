import { RequestSensoresPayload } from "../model/ModelRequestSensores";
import { AuthApi } from "../services/GetSensores";
import { sensorsData } from "../model/DataSensores";
import { FileService } from "../services/FileService";

export class TemperatureChecker {
  static async start(intervalMs = 60000) {
    console.log("⏳ Iniciando verificação dos sensores...");

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

        for (const [sensorId, value] of Object.entries(authData)) {
          sensorsData[sensorId] = value;
        }

        // Agora chama o serviço para gravar os arquivos
        TemperatureChecker.writeSensorFiles(sensorsData);

        // Log para conferência
        console.log("📋 Dados atualizados:");
        for (const [id, value] of Object.entries(sensorsData)) {
          console.log(`Sensor ${id} -> Valor: ${value}`);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar sensores:", error);
      } finally {
        setTimeout(execute, intervalMs);
      }
    };

    execute();
  }

  static writeSensorFiles(data: { [sensorId: string]: string }) {
    const sensoresMap = {
      "temp_jardins.txt": "sensor.monitor_temperatura_jardins_aju_temperatura",
      "umid_jardins.txt": "sensor.monitor_temperatura_jardins_aju_umidade",
      "temp_itabaiana.txt":
        "sensor.monitor_de_temperatura_itabaiana_temperatura",
      "umid_itabaiana.txt": "sensor.monitor_de_temperatura_itabaiana_umidade",
    };

    for (const [fileName, sensorId] of Object.entries(sensoresMap)) {
      const value = data[sensorId] || "0";
      FileService.writeFile(fileName, value.toString());
    }
  }
}

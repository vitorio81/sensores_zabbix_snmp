import { ToSendZabbix } from "../services/ToSendZabbix";

interface Request {
  authData?: {
    [sensorId: string]: string;
  };
}

export class ControllerSensorToZabbix {
  static async process(request: Request): Promise<void> {
    console.log("⏳ Iniciando processo de envio para o Zabbix...");

    try {
      for (const [sensorId, temperature] of Object.entries(
        request.authData || {}
      )) {
        ToSendZabbix.sendTrapperValue(sensorId, temperature);
      }
    } catch (error) {
      console.error("Erro ao enviar temperatura para o Zabbix:", error);
      throw error;
    }
  }
}

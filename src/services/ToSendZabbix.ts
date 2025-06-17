import { exec } from "child_process";
import { config } from "../config/env";

export class ToSendZabbix {
  static async sendTrapperValue(
    sensorId: string,
    temperature: string
  ): Promise<void> {
    const servers = (config.zabbixServer || "").split(",").map((s) => s.trim());

    for (const server of servers) {
      const cmd = `zabbix_sender -z ${server} -s "${config.zabbixHostSensores}" -k ${sensorId} -o ${temperature}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao enviar para o Zabbix: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  }
}

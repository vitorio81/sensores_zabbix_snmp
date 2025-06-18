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
exports.ToSendZabbix = void 0;
const child_process_1 = require("child_process");
const env_1 = require("../config/env");
class ToSendZabbix {
    static sendTrapperValue(sensorId, temperature) {
        return __awaiter(this, void 0, void 0, function* () {
            const servers = (env_1.config.zabbixServer || "").split(",").map((s) => s.trim());
            for (const server of servers) {
                const cmd = `zabbix_sender -z ${server} -s "${env_1.config.zabbixHostSensores}" -k ${sensorId} -o ${temperature}`;
                (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
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
        });
    }
}
exports.ToSendZabbix = ToSendZabbix;

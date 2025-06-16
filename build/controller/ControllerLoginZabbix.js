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
exports.LoginZabbixController = void 0;
const ModelLoginZabbix_1 = require("../model/ModelLoginZabbix");
const LoginZabbix_1 = require("../services/LoginZabbix");
const ControllerSensorToZabbix_1 = require("./ControllerSensorToZabbix");
class LoginZabbixController {
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("⏳ Iniciando login no Zabbix...");
            try {
                const payload = ModelLoginZabbix_1.LoginZabbixPayload.create();
                const data = yield LoginZabbix_1.LoginZabbix.authenticate(payload);
                if (!data) {
                    throw new Error("Erro ao autenticar no Zabbix");
                }
                console.log("Autenticação Zabbix bem-sucedida:", data);
                console.log("🔑 Dados de autenticação:", data);
                if (Object.keys(request.authData || {}).length > 0) {
                    yield ControllerSensorToZabbix_1.ControllerSensorToZabbix.process({ authData: request.authData });
                }
                console.log(request.authData);
            }
            catch (error) {
                console.error("Erro durante o login no Zabbix:", error);
                throw error;
            }
        });
    }
}
exports.LoginZabbixController = LoginZabbixController;

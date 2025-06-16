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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginZabbix = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class LoginZabbix {
    static authenticate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!env_1.config.zabbixHost)
                throw new Error("Host Zabbix não configurado");
            // Converta para objeto puro:
            const data = {
                jsonrpc: payload.jsonrpc,
                method: payload.method,
                params: payload.params,
                id: payload.id,
            };
            const response = yield axios_1.default.post(env_1.config.zabbixHost, data);
            console.log("Resposta do Zabbix:", response.data);
            if (response.data.error) {
                throw new Error(`Erro ao autenticar no Zabbix: ${response.data.error.message}`);
            }
            return response.data.result;
        });
    }
}
exports.LoginZabbix = LoginZabbix;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginZabbixPayload = void 0;
const env_1 = require("../config/env");
class LoginZabbixPayload {
    constructor(payload) {
        this.jsonrpc = payload.jsonrpc;
        this.method = payload.method;
        this.params = payload.params;
        this.id = payload.id;
    }
    static validateConfig() {
        if (!env_1.config.zabbixUser)
            throw new Error("Usuário Zabbix não configurado");
        if (!env_1.config.zabbixPassword)
            throw new Error("Senha Zabbix não configurada");
    }
    static create() {
        this.validateConfig();
        return new LoginZabbixPayload({
            jsonrpc: "2.0",
            method: "user.login",
            params: {
                username: env_1.config.zabbixUser,
                password: env_1.config.zabbixPassword,
            }, // <-- objeto, não array
            id: 1,
        });
    }
}
exports.LoginZabbixPayload = LoginZabbixPayload;

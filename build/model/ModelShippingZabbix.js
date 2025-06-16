"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingZabbixPayload = void 0;
const env_1 = require("../config/env");
class ShippingZabbixPayload {
    constructor(payload) {
        this.jsonrpc = payload.jsonrpc;
        this.method = payload.method;
        this.params = payload.params;
        this.auth = payload.auth;
        this.id = payload.id;
    }
    static validateConfig() {
        if (!env_1.config.zabbixHostSensores)
            throw new Error("Host Zabbix não configurado");
    }
    static create(sensorId, temperature, result) {
        this.validateConfig();
        const payload = {
            jsonrpc: "2.0",
            method: "history.add",
            params: [
                {
                    host: env_1.config.zabbixHostSensores,
                    key: sensorId,
                    value: temperature,
                    clock: Math.floor(Date.now() / 1000),
                },
            ],
            id: 1,
            auth: result,
        };
        return new ShippingZabbixPayload(payload);
    }
}
exports.ShippingZabbixPayload = ShippingZabbixPayload;

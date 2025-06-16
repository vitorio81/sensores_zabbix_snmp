"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAuthPayload = void 0;
const env_1 = require("../config/env");
class RequestAuthPayload {
    constructor(attributes) {
        this.authorization = attributes.authorization;
        this.contentType = attributes.contentType;
        this.url = attributes.url;
    }
    static create(entityId) {
        if (!env_1.config.host)
            throw new Error("Host não configurado");
        if (!env_1.config.secretKayHomeAssistant)
            throw new Error("Chave secreta não configurada");
        const token = env_1.config.secretKayHomeAssistant;
        return new RequestAuthPayload({
            contentType: "application/json",
            authorization: `Bearer ${token}`,
            url: `${env_1.config.host}${entityId}`,
        });
    }
    toJSON() {
        return {
            contentType: this.contentType,
            authorization: this.authorization,
            url: this.url,
        };
    }
}
exports.RequestAuthPayload = RequestAuthPayload;

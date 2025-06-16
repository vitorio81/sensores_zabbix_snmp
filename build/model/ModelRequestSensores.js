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
exports.RequestSensoresPayload = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class RequestSensoresPayload {
    constructor(attributes) {
        this.authorization = attributes.authorization;
        this.contentType = attributes.contentType;
        this.url = attributes.url;
    }
    static create() {
        if (!env_1.config.host)
            throw new Error("Host não configurado");
        if (!env_1.config.secretKayHomeAssistant)
            throw new Error("Chave secreta não configurada");
        const token = env_1.config.secretKayHomeAssistant;
        return new RequestSensoresPayload({
            contentType: "application/json",
            authorization: `Bearer ${token}`,
            url: `${env_1.config.host}`,
        });
    }
    toJSON() {
        return {
            contentType: this.contentType,
            authorization: this.authorization,
            url: this.url,
        };
    }
    // Novo método para buscar sensores
    static fetchSensores() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = RequestSensoresPayload.create();
            const response = yield axios_1.default.get(payload.url, {
                headers: {
                    Authorization: payload.authorization,
                    "Content-Type": payload.contentType,
                },
            });
            return response.data; // deve ser um array de sensores
        });
    }
}
exports.RequestSensoresPayload = RequestSensoresPayload;

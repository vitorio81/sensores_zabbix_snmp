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
exports.TemperatureController = void 0;
const RequestAuth_1 = require("../model/RequestAuth");
const AuthApi_1 = require("../services/AuthApi");
class TemperatureController {
    constructor() {
        this.sensors = [
            {
                id: "sensor.monitor_temperatura_jardins_aju",
                name: "Monitor Temperatura Jardins AJU",
                temperature: null,
            },
            {
                id: "sensor.monitor_temperatura_itabaiana",
                name: "Monitor Temperatura Itabaiana",
                temperature: null,
            },
        ];
    }
    getAllTemperatures() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            for (const sensor of this.sensors) {
                try {
                    const payload = RequestAuth_1.RequestAuthPayload.create(`${sensor.id}`);
                    const data = yield AuthApi_1.AuthApi.authenticate(payload);
                    const temp = parseFloat(data.state);
                    results.push(Object.assign(Object.assign({}, sensor), { temperature: isNaN(temp) ? null : temp }));
                }
                catch (error) {
                    console.error(`Erro ao buscar temperatura de ${sensor.id}:`, error.message);
                    results.push(Object.assign(Object.assign({}, sensor), { temperature: null }));
                }
            }
            return results;
        });
    }
}
exports.TemperatureController = TemperatureController;

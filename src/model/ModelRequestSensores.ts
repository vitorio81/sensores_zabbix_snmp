import axios from "axios";
import { config } from "../config/env";

export interface TemperatureSensor {
  id: string;
  name: string;
  temperature: number | null;
}

export interface IRequestAuthPayload {
  authorization: string;
  contentType: string;
  url: string;
}

export class RequestSensoresPayload {
  authorization: string;
  contentType: string;
  url: string;

  private constructor(attributes: IRequestAuthPayload) {
    this.authorization = attributes.authorization;
    this.contentType = attributes.contentType;
    this.url = attributes.url;
  }

  public static create(): RequestSensoresPayload {
    if (!config.host) throw new Error("Host não configurado");
    if (!config.secretKayHomeAssistant)
      throw new Error("Chave secreta não configurada");
    const token = config.secretKayHomeAssistant;
    return new RequestSensoresPayload({
      contentType: "application/json",
      authorization: `Bearer ${token}`,
      url: `${config.host}`,
    });
  }

  public toJSON(): IRequestAuthPayload {
    return {
      contentType: this.contentType,
      authorization: this.authorization,
      url: this.url,
    };
  }

  // Novo método para buscar sensores
  public static async fetchSensores(): Promise<any[]> {
    const payload = RequestSensoresPayload.create();
    const response = await axios.get(payload.url, {
      headers: {
        Authorization: payload.authorization,
        "Content-Type": payload.contentType,
      },
    });
    return response.data; // deve ser um array de sensores
  }
}

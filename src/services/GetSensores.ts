import { RequestSensoresPayload } from "../model/ModelRequestSensores";
import axios from "axios";

export class AuthApi {
  static async authenticate(payload: RequestSensoresPayload) {
    const response = await axios.get(payload.url, {
      headers: {
        Authorization: payload.authorization,
        "Content-Type": payload.contentType,
      },
    });
    return response.data;
  }
}

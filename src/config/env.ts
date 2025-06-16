import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

export const config = {
  port: process.env.PORT,
  secretKayHomeAssistant: process.env.SECRET_KAY_HOME_ASSITANT,
  host : process.env.HOST,
  zabbixServer: process.env.ZABBIX_SERVER,
  zabbixHost: process.env.ZABBIX_HOST,
  zabbixUser: process.env.ZABBIX_USER,
  zabbixPassword: process.env.ZABBIX_PASSWORD,
  zabbixHostSensores: process.env.ZABBIX_HOST_SENSORES,
};

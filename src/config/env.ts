import dotenv from "dotenv";

dotenv.config();

class ConfigEnv {
  public readonly PORT: number;
  public readonly JWT_SECRET: string;

  // Variables de base de datos MySQL
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_NAME: string;

  constructor() {
    // Config general
    this.PORT = Number(process.env.PORT) || 3000;
    this.JWT_SECRET = process.env.JWT_SECRET || "default_secret";

    // Config MySQL (SQL Command Line Client)
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = Number(process.env.DB_PORT) || 3306;
    this.DB_USER = process.env.DB_USER || "root";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "";
    this.DB_NAME = process.env.DB_NAME || "taskbd";
  }
}

export const env = new ConfigEnv();
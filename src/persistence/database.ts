import { env } from "../config/env";
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

// Probar la conexión al iniciar
pool.getConnection()
  .then(conn => {
    console.log("Conectado a MySQL");
    conn.release(); // liberar la conexión después de probar
  })
  .catch((err) => console.error("Error conexión BD", err));

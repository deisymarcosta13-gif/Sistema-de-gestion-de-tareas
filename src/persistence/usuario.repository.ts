import { pool } from "./database";

export const usuarioRepository = {
  async create(nombre: string, email: string, password: string) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [nombre, email, password]
    );
    return result; // devuelve info de la inserción
  },

  async buscarPorEmail(email: string) {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0]; // retorna un solo usuario
  }
};
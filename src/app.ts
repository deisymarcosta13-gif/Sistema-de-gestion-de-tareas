import express from "express";
import authRoutes from "./api/routes/auth.routes";
import { pool } from "./persistence/database";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ message: "Servidor funcionando", db: rows });
  } catch (err) {
    res.status(500).json({ error: "Error conectando a DB", details: err });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

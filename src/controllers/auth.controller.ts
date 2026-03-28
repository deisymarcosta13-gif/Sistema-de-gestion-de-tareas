import { Request, Response } from "express";
import { servicioAutenticacion } from "../services/auth.service";

export const registrar = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    const usuario = await servicioAutenticacion.registrar(
      nombre,
      email,
      password
    );

    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: usuario
    });
  } catch (error: any) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};
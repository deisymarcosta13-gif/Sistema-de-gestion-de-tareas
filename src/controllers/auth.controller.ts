import { Request, Response } from "express";
import { servicioAutenticacion } from "../services/auth.service";

export const registrar = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    const usuarioCreado: any = await servicioAutenticacion.registrar(
      nombre,
      email,
      password
    );

    // usuarioCreado contiene info de MySQL (insertId, etc.)
    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: {
        id: usuarioCreado.insertId,
        nombre,
        email
      }
    });
  } catch (error: any) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const resultado = await servicioAutenticacion.login(email, password);

    res.status(200).json({
      mensaje: "Login exitoso",
      token: resultado.token
    });

  } catch (error: any) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};
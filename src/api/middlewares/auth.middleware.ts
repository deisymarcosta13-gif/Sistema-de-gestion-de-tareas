import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No hay token" });//valida si el token existe
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, env.JWT_SECRET);//verifica que el token sea valido usnado jwt_secret

    (req as any).usuario = decoded;//guarda el usuario en la request

    next();

  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
}; 
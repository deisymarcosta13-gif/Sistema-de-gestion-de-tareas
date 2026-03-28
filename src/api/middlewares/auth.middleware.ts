import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No hay token" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, env.JWT_SECRET);

    (req as any).usuario = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
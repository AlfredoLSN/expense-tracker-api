import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const verifyToken = function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!secret) {
    res.status(500).json({
      message: "Configuração inválida no servidor: SECRET não definida.",
    });
    return;
  }
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; //"Bearer [token]"
  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.body.authUser = decoded;
    next();
  } catch (error: any) {
    res
      .status(401)
      .json({ message: "Token invalido ou expirado", error: error.message });
  }
};

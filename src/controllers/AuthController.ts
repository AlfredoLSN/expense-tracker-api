import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const secret = process.env.SECRET;
      if (!secret) {
        res.status(500).json({
          message: "Configuração inválida no servidor: SECRET não definida.",
        });
        return;
      }
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res
          .status(404)
          .json({ message: `Usuario com email ${email} não foi encontrado.` });
        return;
      }
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        res.status(401).json({ message: "Senha invalida" });
        return;
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        secret,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (error: any) {
      console.error("Erro Interno:", error);
      res
        .status(500)
        .json({ message: "Erro interno de servidor", error: error.message });
    }
  }
}

export default new AuthController();

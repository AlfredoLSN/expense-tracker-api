import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcryptjs";
class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany();
      res.status(200);
      res.json(users);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuarios", error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = +req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) {
        res.status(404).json({ message: "Nenhum usuario encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {}
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.json(newUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error interno do servidor", erro: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedUser);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    const deletedUser = await prisma.user.delete({ where: { id } });
    res.json(deletedUser);
  }
}

export default new UserController();

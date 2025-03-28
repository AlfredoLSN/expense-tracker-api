import { Request, Response } from "express";
import prisma from "../config/db";
class ExpenseController {
  async getAllByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = +req.params.userId;
      if (isNaN(userId) || userId < 0) {
        res.status(400).json({ message: "Parametro Invalidos" });
        return;
      }
      const expenses = await prisma.expense.findMany({
        where: {
          userId,
        },
      });
      res.json(expenses);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", erro: error.message });
    }
  }

  async getExpensesFromPastWeek(req: Request, res: Response): Promise<void> {
    try {
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 7);
      const userId = +req.params.userId;
      if (isNaN(userId) || userId < 0) {
        res.status(400).json({ message: "Parametro Invalidos" });
        return;
      }
      const expenses = await prisma.expense.findMany({
        where: {
          userId: userId,
          createdDate: {
            gte: pastWeek,
          },
        },
      });
      res.json(expenses);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", erro: error.message });
    }
  }

  async getExpensesFromLastMonth(req: Request, res: Response): Promise<void> {
    try {
      const dateNow = new Date();
      const startLastMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth() - 1,
        1
      );
      const endLastMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        0
      );
      const userId = +req.params.userId;
      if (isNaN(userId) || userId < 0) {
        res.status(400).json({ message: "Parametro Invalidos" });
        return;
      }
      const expenses = await prisma.expense.findMany({
        where: {
          userId: userId,
          createdDate: {
            gte: startLastMonth,
            lte: endLastMonth,
          },
        },
      });
      res.json(expenses);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", erro: error.message });
    }
  }

  async getExpensesFromLast3Months(req: Request, res: Response): Promise<void> {
    try {
      const dateNow = new Date();
      const startLastMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth() - 3,
        1
      );
      const endLastMonth = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        0
      );
      const userId = +req.params.userId;
      if (isNaN(userId) || userId < 0) {
        res.status(400).json({ message: "Parametro Invalidos" });
        return;
      }
      const expenses = await prisma.expense.findMany({
        where: {
          userId: userId,
          createdDate: {
            gte: startLastMonth,
            lte: endLastMonth,
          },
        },
      });
      res.json(expenses);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", erro: error.message });
    }
  }

  async getExpensesFromCustomRangeDate(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : new Date(new Date().setDate(new Date().getDate() - 7));
      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : new Date();
      const userId = +req.params.userId;
      if (isNaN(userId) || userId < 0) {
        res.status(400).json({ message: "Parametro Invalidos" });
        return;
      }

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        res
          .status(400)
          .json({
            message:
              "Datas inválidas fornecidas. Use o formato ISO: YYYY-MM-DD.",
          });
        return;
      }

      const expenses = await prisma.expense.findMany({
        where: {
          userId: userId,
          createdDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      res.json(expenses);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", erro: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, valor, category } = req.body;
      const newExpense = await prisma.expense.create({
        data: {
          userId,
          valor,
          category,
        },
      });
      res.json(newExpense);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = +req.params.id;
      const updatedExpense = await prisma.expense.update({
        where: { id },
        data: req.body,
      });
      res.json(updatedExpense);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", error: error.message });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const id = +req.params.id;
      const deletedExpense = await prisma.expense.delete({
        where: { id },
      });
      res.json(deletedExpense);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Erro interno do servidor", error: error.message });
    }
  }
}

export default new ExpenseController();

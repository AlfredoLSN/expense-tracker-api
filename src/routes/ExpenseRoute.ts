import express from "express";
import ExpenseController from "../controllers/ExpenseController";
import { verifyToken } from "../middlewares/checkAuthentication";

const expenseRouter = express.Router();

expenseRouter.get(
  "/user/:userId",
  verifyToken,
  ExpenseController.getAllByUserId
);

expenseRouter.get(
  "/user/:userId/past-week",
  verifyToken,
  ExpenseController.getExpensesFromPastWeek
);

expenseRouter.get(
  "/user/:userId/last-month",
  verifyToken,
  ExpenseController.getExpensesFromLastMonth
);

expenseRouter.get(
  "/user/:userId/last-3-month",
  verifyToken,
  ExpenseController.getExpensesFromLast3Months
);

expenseRouter.get(
  "/user/:userId/customRange",
  verifyToken,
  ExpenseController.getExpensesFromCustomRangeDate
);

expenseRouter.post("/", verifyToken, ExpenseController.create);

expenseRouter.patch("/:id", verifyToken, ExpenseController.update);

expenseRouter.delete("/:id", verifyToken, ExpenseController.remove);

export default expenseRouter;

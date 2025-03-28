import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoute";
import authRouter from "./routes/AuthRoute";
import expenseRouter from "./routes/ExpenseRoute";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Word!");
});

app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/auth", authRouter);

const port = process.env.PORT;
app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

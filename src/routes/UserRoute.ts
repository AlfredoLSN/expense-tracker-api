import express from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../middlewares/checkAuthentication";
const userRouter = express.Router();

userRouter.get("/", verifyToken, UserController.getAll);
userRouter.get("/:id", verifyToken, UserController.getById);
userRouter.post("/", verifyToken, UserController.create);
userRouter.patch("/:id", verifyToken, UserController.update);
userRouter.delete("/:id", verifyToken, UserController.remove);
export default userRouter;

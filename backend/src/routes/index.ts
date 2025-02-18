import { Router } from "express";
import authRoutes from "./AuthRouter";

const router = Router();

router.use("/auth", authRoutes);

export default router;

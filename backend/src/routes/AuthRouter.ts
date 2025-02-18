import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/verify-user", AuthController.verifyUser);

export default router;

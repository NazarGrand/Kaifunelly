import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authMe } from "../middleware/authMe";

const router = Router();

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/verify-user", AuthController.verifyUser);

router.get("/me", authMe, AuthController.me);

export default router;

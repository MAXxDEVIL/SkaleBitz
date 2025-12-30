import { Router } from "express";
import { signup, signin, verifyEmail, resendVerification, deleteAccount } from "../controllers/authController.js";
import authRequired from "../middleware/authRequired.js";

const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify", verifyEmail);
router.post("/resend-verification", resendVerification);
router.delete("/me", authRequired, deleteAccount);

export default router;
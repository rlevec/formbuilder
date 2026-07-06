import { Router } from "express";

const router = Router();

import { loginController } from "../controllers/login.controller";

import { registerController } from "../controllers/register.controller";

import { logoutController } from "../controllers/logout.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

router.post("/login", (req, res) => {
    return loginController(req, res)
});

router.post("/register", (req, res) => {
  return registerController(req, res)
});


router.post("/logout", authMiddleware, (req, res) => {
  return logoutController(req, res)
})

export default router;
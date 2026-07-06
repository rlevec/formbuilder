import { Router } from "express";

import { formdataController } from "../controllers/formdata.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:type", formdataController);

export default router;
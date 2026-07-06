import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { formbuilder } from "../formdata/formbuilder.formdata";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  return res.json({message: "Unatuh", error: false, data: formbuilder})
})

export default router;
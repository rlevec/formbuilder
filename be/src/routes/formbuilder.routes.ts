import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { formbuilder } from "../formdata/formbuilder.formdata";

import { saveTemplate } from "../services/formdata.service";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  return res.json({message: "Formbuild Data Fetched Successfully", error: false, data: formbuilder})
})

router.post("/template/save", authMiddleware, (req, res) => {
  return saveTemplate(req, res)
})

export default router;
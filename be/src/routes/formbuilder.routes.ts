import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { formbuilder } from "../formdata/formbuilder.formdata";

import { saveTemplateController } from "../controllers/saveTemplate.controller";

import { getTemplatesController } from "../controllers/getTemplates.controller";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  return res.json({message: "Formbuild Data Fetched Successfully", error: false, data: formbuilder})
})

router.post("/template/save", authMiddleware, (req, res) => {
  return saveTemplateController(req, res)
})

router.get("/templates", authMiddleware, (req, res) => {
  return getTemplatesController(req, res)
})

export default router;
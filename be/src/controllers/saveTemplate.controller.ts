import { Request, Response } from "express";

import { saveTemplate } from "../services/formdata.service";

export const saveTemplateController = async (req: Request, res: Response) => {
  const data = req.body;

  const userId = req.session.user?.id;

  const result = await saveTemplate({ data, userId });
  
  return res.json(result);
};

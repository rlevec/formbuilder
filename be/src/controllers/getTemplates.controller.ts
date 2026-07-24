import { Request, Response } from "express";

import { getTemplates } from "../services/formdata.service";

export const getTemplatesController = async (req: Request, res: Response) => {
  const data = req.body;

  const userId = req.session.user?.id;

  const result = await getTemplates(userId);
  
  return res.json(result);
};

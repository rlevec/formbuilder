import { registerFormdata } from "../formdata/register.formdata";
import { loginFormdata } from "../formdata/login.formdata";
import { formbuilder } from "../formdata/formbuilder.formdata";

import { throwNewError } from "../utils/global.utils";

import type { CanvasFieldInstance } from "../types";

import { Request, Response } from "express";

import { createTemplate } from "../repositories/formbuilder.repository";

const FORMDATA_MAP = {
  login: loginFormdata,
  registration: registerFormdata,
  formbuilder: formbuilder,
} as const;

export const getFormdata = ({ type }: { type: string }) => {
  if (!type || !(type in FORMDATA_MAP)) {
    return throwNewError(400, "Invalid type param");
  }

  const formdata = FORMDATA_MAP[type as keyof typeof FORMDATA_MAP];

  if (!formdata) {
    return throwNewError(400, "Invalid formdata for provided type");
  }

  return {
    error: false,
    message: `You have successfully fetched ${type} formdata`,
    data: formdata,
  };
};

export const saveTemplate = async (req: Request, res: Response) => {
  const body = req.body;

  const userId = req.session.user?.id;

  console.log("userId", userId);

  if (!userId) {
    return throwNewError(400, "User ID is missing");
  }

  const { fields, form } = body as {
    fields: CanvasFieldInstance[];
    form: Record<string, string | boolean>;
  };

  const createTemplateResponse = await createTemplate({
    userId,
    fields,
    form,
  });

  if (!createTemplateResponse) {
    return throwNewError(400, "Template DB creation error!");
  }

  return res.json({
    error: false,
    message: "You have successfully created template!",
  });
};

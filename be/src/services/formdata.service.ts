import { registerFormdata } from "../formdata/register.formdata";
import { loginFormdata } from "../formdata/login.formdata";
import { formbuilder } from "../formdata/formbuilder.formdata";

import { throwNewError } from "../utils/global.utils";

import type { CanvasFieldInstance } from "../types";

import { createTemplate, getUserTemplates } from "../repositories/formbuilder.repository";

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

type SaveTemplateParams = {
  data: {
    fields: CanvasFieldInstance[];
    form: Record<string, string | boolean>;
  };
  userId?: number;
};

export const saveTemplate = async ({
  data,
  userId,
}: SaveTemplateParams) => {
  if (!userId) {
    return throwNewError(400, "User ID is missing");
  }

  const { fields, form } = data;

  const createTemplateResponse = await createTemplate({
    userId,
    fields,
    form,
  });

  if (!createTemplateResponse) {
    return throwNewError(400, "Template DB creation error!");
  }

  return {
    error: false,
    message: "You have successfully created template!",
  };
};

export const getTemplates = async(userId?: number) => {
  if (!userId) {
    return throwNewError(400, "User ID is missing");
  }

  const getTemplatesResponse = await getUserTemplates(userId)

  if (!getTemplatesResponse) {
    return throwNewError(400, "Template DB fetch error!");
  }

  return {
    error: false,
    message: "You have successfully fetched templates!",
    data: getTemplatesResponse
  };
}
import { z } from "zod"
import { registerFormdata } from "../formdata/register.formdata";
import { loginFormdata } from "../formdata/login.formdata";
import { buildZodSchema } from "../utils/zod.utils";

export const loginSchema = buildZodSchema(loginFormdata.fields);

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = buildZodSchema(registerFormdata.fields);

export type RegisterInput = z.infer<typeof registerSchema>;

export const passwordRules = () => {

}

export const emailValidation = () => {
    
}
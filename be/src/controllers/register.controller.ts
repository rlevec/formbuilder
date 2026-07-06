import { Request, Response } from "express"

import { register } from "../services/auth.service";

import { registerSchema } from "../validators/auth.schema";

export const registerController =  async(req: Request, res: Response) => {

    const data = registerSchema.parse(req.body);
    const result = await register(data);
    return res.json(result);
}
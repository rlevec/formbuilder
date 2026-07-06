import { Request, Response } from "express";
import { login } from "../services/auth.service";
import { loginSchema } from "../validators/auth.schema";


export const loginController = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await login(data);

  req.session.user = {
    id: user.id,
    email: user.email,
  };

  req.session.save(() => {
    return res.json({
      error: false,
      message: "Login successful",
      user,
    });
  });
};
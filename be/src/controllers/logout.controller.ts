import { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");

    return res.json({
      error: false,
      message: "Logged out",
    });
  });
};
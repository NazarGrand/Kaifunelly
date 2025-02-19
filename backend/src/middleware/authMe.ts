import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/User.entity";

interface DecodedToken extends JwtPayload {
  user: User;
}

export const authMe = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(
      token!,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !("user" in decoded)) {
      res.status(401).json({ message: "Invalid token" });
    }

    req.body.user = (decoded as DecodedToken).user;
    next();
  } catch (error: unknown) {
    console.error((error as Error).message);
    res
      .status(401)
      .json({ message: "Internal server error at authMe middleware" });
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  // The entire header value is now treated as the token
  const token = req.headers["authorization"];

  // Check if a token was sent at all
  if (!token) {
    return res.status(403).json({ message: "Unauthorized: Token not sent" });
  }

  try {
    // Verify the token directly
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // @ts-ignore
    req.userId = decoded.userId;
    // @ts-ignore
    req.username = decoded.username;
        // @ts-ignore
        console.log(req.userId)
        // @ts-ignore
        console.log(req.username)
    
    next();
  } catch (e) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Unauthorized: Token not provided or malformed" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: Token not provided or malformed" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // @ts-ignore
    req.userId = decoded.userId;
    // @ts-ignore
    req.username = decoded.username;
    
    next();
  } catch (e) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}
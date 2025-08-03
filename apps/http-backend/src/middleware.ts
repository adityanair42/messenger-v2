import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  // Get the header, which looks like "Bearer <token>"
  const authHeader = req.headers["authorization"];

  // If there's no header or it's empty, block the request
  if (!authHeader) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    // 1. Split "Bearer " off and get JUST the token
    const token = authHeader.split(' ')[1];

    // 2. Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach the data to the request and continue
    // @ts-ignore
    req.userId = decoded.userId;
    // @ts-ignore
    req.username = decoded.username;
    next();
  } catch (e) {
    // If the token is bad or missing, jwt.verify will fail and we'll end up here
    res.status(403).json({ message: "Unauthorized" });
  }
}
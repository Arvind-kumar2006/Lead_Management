import { NextFunction, Request, Response } from "express";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request,res: Response,next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({success: false,message: "Not authorized",});
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({success: false,message: "Access denied"});
      return;
    }

    next();
  };
};
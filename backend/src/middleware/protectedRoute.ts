import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: { uid: string; email: string }; // Defining user property
}

export const authProtectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
   /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> => {
  try {
    const token = req.cookies.jwt; // Extracting the JWT token from the cookies
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken | string;
    
    if (typeof decoded === 'string') {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }

    req.user = { uid: decoded.userId, email: decoded.email }; // Setting the user property in the request object
    next(); // Calling the controller function if the token is valid and decoded successfully;
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized - token expired" });
    } else {
      console.error("Error in protectRoute middleware:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

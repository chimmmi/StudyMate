import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, username: string, email: string,  res: Response) => {
    const token = jwt.sign({ userId, username, email }, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true, // Prevent XSS attacks
      sameSite: 'strict', //CSRF attack cross-site request forgery
      secure: process.env.NODE_ENV !== "development" // HTTPS only in production
    });
  
    return token;
  };

export default generateToken;
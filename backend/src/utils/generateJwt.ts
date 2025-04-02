import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, username: string, email: string, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_SECRET;
  if (!jwtSecret || !refreshSecret) {
    throw new Error("JWT_SECRET and REFRESH_SECRET environment variable are not set");
  }

  // Generate the Access token (short-lived)
  const accessToken = jwt.sign({ userId, username, email }, jwtSecret, {
    expiresIn: "15m", // Expires in 15 minutes
  });

  //Generate Refresh token (long-lived)
  const refreshToken = jwt.sign({userId}, refreshSecret, {
    expiresIn: "7d", // Expires in 7 days;
  })
  // Storing the refresh token as a secure, httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    domain: "localhost", // Domain of the cookie
    path: "/", 
    sameSite: 'strict', // CSRF protection
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
  });

  return accessToken;
};

export default generateToken;

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper function to verify refresh token returning a promise
const verifyRefreshToken = (
  refreshToken: string,
  refreshSecret: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
      if (err) {
        reject(err); // Reject the promise if there is an error
      }
      resolve(decoded); // Resolve the promise if decoded is successful
    });
  });
};

// The controller using async/await to handle the refresh token
export const refreshTokenHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const refreshSecret = process.env.REFRESH_SECRET;
    if (!refreshSecret) {
      return res.status(500).json({ message: "Missing refresh token secret" });
    }

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No refresh token provided" });
    }

    // Verify the refresh token using the helper function that returns a promise
    const decoded = await verifyRefreshToken(refreshToken, refreshSecret);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutHandler = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "Logged out successfully" });
  res.status(200).json({ message: "logged out" });
};

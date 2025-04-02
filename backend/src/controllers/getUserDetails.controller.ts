import { db } from "../server.js";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: { uid: string; email: string }; // Defining user property from the request object sent by the middleware
}
export const getUserDetails = async (
  req: AuthenticatedRequest,
  res: Response
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.uid; // Extracting the user ID from the request object
    const userDoc = await db.collection("users").doc(userId).get(); // Fetching user data from Firestore;

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" }); // If user not found in Firestore
    }
    return res.status(200).json({ user: userDoc.data() }); // If user found in Firestore
  } catch (error) {
    console.error("Error fetching user profile", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

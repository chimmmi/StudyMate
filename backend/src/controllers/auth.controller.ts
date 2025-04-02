import { db } from "../server.js";
import admin from "firebase-admin";
import { Request, Response } from "express";
import generateToken from "../utils/generateJwt.js";

// Signup logic
/* eslint-disable @typescript-eslint/no-explicit-any */
export const signUpUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      course,
      university,
    } = req.body;

    // Check if all fields are filled
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !course ||
      !university
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Password must match confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Email uniqueness check
    const emailRef = db.collection("users");
    const emailQuery = emailRef.where("email", "==", email);
    const emailSnapshot = await emailQuery.get();

    if (!emailSnapshot.empty) {
      console.error("Email already in use");
      return res.status(400).json({ message: "Email already in use", id: "2" });
    }
    // Username uniqueness check
    const userRef = db.collection("users");
    const query = userRef.where("username", "==", username);
    const userSnapshot = await query.get();

    if (!userSnapshot.empty) {
      return res
        .status(400)
        .json({ message: "Username already taken", id: "1" });
    }

    // Creating user in Firebase Authentication
    const newUser = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    // Storing additional data in Firestore
    await db.collection("users").doc(newUser.uid).set({
      firstName,
      lastName,
      username,
      email,
      course,
      university,
    });

    // Generating JWT token
    const accessToken = generateToken(newUser.uid, username, email, res);

    // success response
    return res
      .status(200)
      .json({ message: "User registered successfully!", accessToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during signup:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

//**Login logic
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let email: string | null = null;
    let username: string | null = null;

    // chekcing if identifier is an email or username
    if (identifier.includes("@")) {
      email = identifier;
    } else {
      username = identifier;
      // Fetching the user email from Firestore based on username
      const userSnapshot = await admin
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .limit(1)
        .get();

      if (userSnapshot.empty) {
        return res.status(400).json({ message: "User not found" });
      }
      email = userSnapshot.docs[0].data().email;
    }

    if (!email) {
      return res.status(400).json({ message: "Email not found for user" });
    }

    // checking if user exists in Firebase Authentication
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
    } catch (error:any) {
      return res.status(400).json({ message: "User not found in authentication system", id: 1});
    }

    // Generate JWT token
    const accessToken = generateToken(
      user.uid,
      username || user.displayName!,
      email,
      res
    );

    return res.status(200).json({ message: "Login Successful", accessToken });
  } catch (error: any) {
    console.error("Error logging in user", error);
    return res.status(500).json({ error: "Failed to login user" });
  }
};

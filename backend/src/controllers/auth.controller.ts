import { db } from "../server.js";
import admin from "firebase-admin";
import { Request, Response } from "express";
import generateToken from "../utils/generateJwt.js";


// Sign up logic
export const signUpUser = async (
  req: Request,
  res: Response
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword, course, university } =
      req.body;

    //Checking if the use fills all inputs
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
    // Checking for matching passwords
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Getting the reference of the 'users' collection:
    const userRef = db.collection("users");

    const query = userRef.where("username", "==", username); // creating a query to check if username already exists.

    const snapshot = await query.get(); // executing the query to fetch with following data

    if (!snapshot.empty) {
      return res.status(400).json({ message: "Username already taken" });
    }

    
    //Creating a new user
    const newUser = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    // Storing additional user data to Firestore
    await db.collection("users").doc(newUser.uid).set({
      firstName,
      lastName,
      username,
      email,
      course,
      university,
    });

    //Generating a JWT:
    generateToken(newUser.uid, username, email, res);

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

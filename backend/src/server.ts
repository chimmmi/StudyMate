import express from "express";
import cors from "cors"; // Enables Cross-Origin Resource Sharing (CORS), allowing frontend apps from different domains to interact with this API.
import admin from "firebase-admin";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Fix newline characters
};

// Initializing Firebase admin:
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

const port = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // methods alowed
  credentials: true, // Allowing credentials
};

//middleware
app.use(cookieParser()); // Parsing incoming cookies from the request headers
app.use(cors(corsOptions)); // Allowing requests from other origins
app.use(bodyParser.json()); // Parsing incoming JSON requests, making req.body available

//Routes
app.use("/api", routes);

//Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

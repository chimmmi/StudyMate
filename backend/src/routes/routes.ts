import express from "express";
import { loginUser, signUpUser } from "../controllers/auth.controller.js";
import { authProtectRoute } from "../middleware/protectedRoute.js";
import { getUserDetails} from "../controllers/getUserDetails.controller.js";
import { refreshTokenHandler } from "../controllers/refreshToken.controller.js";

const router = express.Router();

router.post("/auth/signup", signUpUser)

router.post('/auth/login', loginUser);

// Using a protected route to get the user information  from the firestore;
router.get("/auth/me", authProtectRoute, getUserDetails);

router.post("/refresh", refreshTokenHandler);


export default router;
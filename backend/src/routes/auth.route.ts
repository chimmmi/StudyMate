import express from "express";
import { signUpUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login');
});

router.post("/signup", signUpUser)

export default router;
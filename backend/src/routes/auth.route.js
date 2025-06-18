import express from "express";
import { login, logout, signup ,checkAuth,updateProfile} from "../controller/auth.controller.js";
import { protectRoute,adminProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
router.post("/signup", adminProtect,login);
export default router;

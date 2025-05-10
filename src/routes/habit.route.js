import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { completeHabit, createHabit, deleteHabit, updateHabit } from "../controllers/habit.controller.js";

const router = Router();

router.route('/create').post(verifyJWT, createHabit);
router.route('/delete/:habitId').post(verifyJWT, deleteHabit);
router.route('/update/:habitId').post(verifyJWT, updateHabit);
router.route('/complete/:habitId').post(verifyJWT, completeHabit);

export default router
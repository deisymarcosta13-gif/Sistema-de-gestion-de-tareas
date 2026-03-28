import { Router } from "express";
import { registrar } from "../../controllers/auth.controller";

const router = Router();

router.post("/register", registrar);

export default router;
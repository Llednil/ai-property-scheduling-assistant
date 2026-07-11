import { Router } from "express";
import { getTenants } from "../controllers/tenantController";

const router = Router();

router.get("/", getTenants);

export default router;
import { Router } from "express";
import {
  getAllTemplates,
  createNewTemplate,
  updateExistingTemplate,
  removeTemplate,
} from "../controllers/templatecontroller";

const router = Router();

router.get("/", getAllTemplates);
router.post("/", createNewTemplate);
router.put("/:id", updateExistingTemplate);
router.delete("/:id", removeTemplate);

export default router;

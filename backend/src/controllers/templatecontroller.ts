import { Request, Response } from "express";
import { getTemplates, createTemplate, updateTemplate, deleteTemplate } from "../services/templateService";

export const getAllTemplates = async (req: Request, res: Response) => {
    try {
      const zone = req.query.zone as string | undefined;
      const templates = await getTemplates(zone);
      res.json(templates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get templates" });
    }
};

export const createNewTemplate = async (req: Request, res: Response) => {
    try {
      const { name, body, zone } = req.body;
      const template = await createTemplate(name, body, zone);
      res.status(201).json(template);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create template" });
    }
};

export const updateExistingTemplate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, body, zone } = req.body;
      const template = await updateTemplate(id, name, body, zone);
      res.json(template);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update template" });
    }
};

export const removeTemplate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const template = await deleteTemplate(id);
      res.json(template);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete template" });
    }
};
import { Request, Response } from "express";
import {getAllSheetData} from "../services/googleSheetsService";

export const getTenants = async (_req: Request, res: Response) => {

try {
    const tenants = await getAllSheetData();
    res.json(tenants);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tenants" });
}
};
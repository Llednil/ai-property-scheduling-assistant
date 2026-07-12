import express from "express";
import tenantRoutes from "./routes/tenantRoutes";
import { getWorksheetNames } from "./services/googleSheetsService";

const app = express();
const PORT = 3001;

// Middleware (we'll learn more about this later)
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("AI Property Scheduling Assistant API is running!");
});

// Tenant routes
app.use("/api/tenants", tenantRoutes);

app.get("/test-worksheet-names", async (req, res) => {
    try {
        const worksheetNames = await getWorksheetNames();
        res.json(worksheetNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get worksheet names" });
    }   
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


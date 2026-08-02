import express from "express";
import cors from "cors";
import tenantRoutes from "./routes/tenantRoutes";
import templateRoutes from "./routes/templateRoutes";

const app = express();
const PORT = 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("AI Property Scheduling Assistant API is running!");
});

app.use("/api/tenants", tenantRoutes);
app.use("/api/templates", templateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
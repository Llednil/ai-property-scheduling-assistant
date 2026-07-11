import express from "express";
import tenantRoutes from "./routes/tenantRoutes";

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
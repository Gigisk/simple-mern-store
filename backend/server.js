import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve(); // Get the current directory name

// ✅ Enable CORS for all origins
app.use(cors());

// OR (for specific origin)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

app.use(express.json()); // Used to accept JSON data in requests

app.use("/api/products", productRoutes); // Mount the product route

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

// YaGwE7izlVIxM5qL

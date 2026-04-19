import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"; // ✅ import cors
import notesroutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS MUST COME FIRST
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
}));

app.use(express.json());

// Routes
app.use("/api/notes", notesroutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();
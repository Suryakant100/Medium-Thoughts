import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { router } from "../server/routes/routes.js";
import cors from "cors";
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use(cors());

app.use("/", router);

//db connection
mongoose.connect(process.env.DB_LOCATION);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

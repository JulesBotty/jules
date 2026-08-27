import "dotenv/config";
import express from "express";
import path from 'path';
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import leaveRoutes from "./src/routes/leaveRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

const app = express();

//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORTS || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || "")
//const allowedOrigins = (process.env.CORS_API_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

connectDB();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);


//app.use(express.static(path.join(import.meta.dirname, '../frontend/dist')));

//app.get('/api/health', (_req, res) => {
 // res.sendFile(path.join(import.meta.dirname, '../frontend/dist/index.html'));

//});

//app.put('/api/health', (_req, res) => {
 // res.sendFile(path.join(import.meta.dirname, '../frontend/dist/index.html'));
  
//});




app.use(express.json());
app.use(morgan("dev"));



app.get("/api/health", (_req, res) => {
 res.json({ message: "API is running" });
});

app.put("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});


app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);



app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



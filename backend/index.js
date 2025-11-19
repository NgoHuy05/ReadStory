import "dotenv/config"; 
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/databaseConnect.js";
import routers from "./routes/index.route.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5555;

// Kết nối DB
connectDB();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://storyread-uet-kdqb.vercel.app"
    ],
    credentials: true, // bắt buộc khi frontend gửi cookie
  })
);


// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// Routers
routers(app);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

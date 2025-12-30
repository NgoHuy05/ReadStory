import "dotenv/config"; 
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/databaseConnect.js";
import routers from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import { errorHandle } from "./middlewares/errorHandleMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5555;

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://storyread-uet-kdqb.vercel.app"
    ],
    credentials: true, 
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

routers(app);

app.use(errorHandle);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

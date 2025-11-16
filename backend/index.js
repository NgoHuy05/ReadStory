require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/databaseConnect");
const routers = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 5555;
connectDB();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://storyread-uet-kdqb.vercel.app"
        ]
    })
);
app.use(express.json());
app.use(morgan("dev"));
routers(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
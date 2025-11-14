import express from "express";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import interestRoutes from "./routes/interestRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "https://connectee-rust.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({
    message: "gotta get rich",
  });
});
app.use("/user", userRoutes);
app.use("/api", postRoutes);
app.use("/", interestRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

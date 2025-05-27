import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import logger from "./config/logger.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/assets/uploads", express.static(path.join(__dirname, process.env.UPLOAD_DIR)));

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

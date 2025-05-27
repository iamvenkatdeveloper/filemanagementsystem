import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, `../${process.env.UPLOAD_DIR}`);

export const download = async (filename) => {
  if (!filename || filename.includes("..") || path.basename(filename) !== filename) {
    throw new Error("Invalid filename");
  }

  const fullPath = path.join(UPLOAD_DIR, filename);
  try {
    await fs.access(fullPath);
    return fullPath;
  } catch {
    throw new Error("File not found");
  }
};

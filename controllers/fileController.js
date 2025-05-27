import path from "path";
import fs from "fs/promises";
import { download } from "../services/fileService.js";
import { STATUS, MESSAGES } from "../config/config.js";
import logger from "../config/logger.js";

const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
const blockedExtensions = [".exe", ".bat", ".sh", ".php"];

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      logger.warn("No file uploaded");
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.NO_FILE });
    }

    const filePath = path.join(process.env.UPLOAD_DIR, req.file.filename);
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (!allowedTypes.includes(req.file.mimetype) || blockedExtensions.includes(ext)) {
      await fs.unlink(filePath);
      logger.warn(`Invalid file uploaded: ${req.file.originalname}`);
      return res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.FILE_INVALID });
    }

    logger.info(`File uploaded: ${req.file.filename}`);
    res.status(STATUS.OK).json({
      message: MESSAGES.FILE_UPLOADED,
      filename: req.file.filename,
    });
  } catch (error) {
    logger.error(`Upload error: ${error.message}`);
    res.status(STATUS.INTERNAL_ERROR).json({ message: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const filePath = await download(req.params.filename);
    logger.info(`File download: ${req.params.filename}`);
    res.status(STATUS.OK).download(filePath);
  } catch (err) {
    logger.warn(`File not found: ${req.params.filename}`);
    res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.FILE_NOT_FOUND });
  }
};

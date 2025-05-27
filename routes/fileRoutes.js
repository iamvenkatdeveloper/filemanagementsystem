import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadFile, downloadFile } from "../controllers/fileController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "");
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files/:filename", downloadFile);

export default router;

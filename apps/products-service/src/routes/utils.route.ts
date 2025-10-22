import { Router } from "express";
import multer from "multer";
import { shouldBeAdmin } from "../middleware/authMiddleware";
import { UploadImage } from "../controllers/utils.controller";



const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/upload-image", shouldBeAdmin, upload.single("file"), UploadImage)

export default router;
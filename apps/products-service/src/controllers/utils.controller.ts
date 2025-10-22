import e, { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File
    }
  }
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const UploadImage = async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  if (!req.file?.buffer || req.file.size === 0) return res.status(400).json({ message: "Image is required" })
  try {
    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder: "products",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        resource_type: "image",
        filename_override: req.file?.originalname,
        overwrite: true,
        use_filename: true,
        unique_filename: true,
      },
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message })
          else resolve(result)
        }
      );
      stream.end(req.file?.buffer)
    })
    const { secure_url, public_id } = uploadRes as { secure_url: string, public_id: string }
    res.status(200).json({ url: secure_url, public_id })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", err })
  }
}
import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getLatestProducts, getProduct, updateProduct } from "../controllers/product.controller";
import { shouldBeAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAdmin, createProduct)
router.put("/:id", shouldBeAdmin, updateProduct)
router.delete("/:id", shouldBeAdmin, deleteProduct)
router.get("/", getAllProducts)
router.get("/latest", getLatestProducts)
router.get("/:id", getProduct)



export default router;
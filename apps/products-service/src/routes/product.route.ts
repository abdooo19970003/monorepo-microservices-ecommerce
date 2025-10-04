import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller";

const router: Router = Router();

router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/", getAllProducts)
router.get("/:id", getProduct)



export default router;
import { Router } from "express";
import { shouldBeAdmin } from "../middleware/authMiddleware";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";

// RoutePrefix "/users"
const router: Router = Router()
router.get("/", shouldBeAdmin, getAllUsers)
router.get("/:id", shouldBeAdmin, getUserById)
router.post("/", shouldBeAdmin, createUser)
router.put("/:id", shouldBeAdmin, updateUser)
router.delete("/:id", shouldBeAdmin, deleteUser)

export default router
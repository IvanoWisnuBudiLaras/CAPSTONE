// @ts-check
import { Router } from "express";
import { db } from "../db/index.js";
import { users as usersSchema } from "../db/schema.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const data = await db
      .select()
      .from(usersSchema)
      .orderBy(usersSchema.createdAt);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Internal Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;

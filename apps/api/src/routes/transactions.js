// @ts-check
import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { TransactionSchema } from "@repo/shared";
import { db } from "../db/index.js";
import { transactions } from "../db/schema.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

/**
 * @typedef {import("express").Request & { user: { id: string, role: string } }} AuthenticatedRequest
 */

// Get all transactions for the current user
router.get("/", authenticate, async (req, res) => {
  const authReq = /** @type {AuthenticatedRequest} */ (/** @type {*} */ (req));
  try {
    const data = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, authReq.user.id));

    res.json({ success: true, data });
  } catch (error) {
    console.error("Transactions GET error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch transactions" });
  }
});

// Create a new transaction
router.post("/", authenticate, async (req, res) => {
  const authReq = /** @type {AuthenticatedRequest} */ (/** @type {*} */ (req));
  
  try {
    const result = TransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.flatten(),
      });
    }

    const [newTransaction] = await db
      .insert(transactions)
      .values({
        userId: authReq.user.id,
        type: result.data.type,
        category: result.data.category,
        allocationType: result.data.allocation_type,
        amount: result.data.amount.toString(),
        date: new Date(result.data.date),
        description: result.data.description,
      })
      .returning();

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Transaction POST Error:", error);
    res.status(500).json({ success: false, message: "Failed to create transaction" });
  }
});

// Delete a transaction
router.delete("/:id", authenticate, async (req, res) => {
  const authReq = /** @type {AuthenticatedRequest} */ (/** @type {*} */ (req));
  const { id } = req.params;

  try {
    await db
      .delete(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, authReq.user.id)));

    res.json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    console.error("Transaction DELETE Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete transaction" });
  }
});

export default router;

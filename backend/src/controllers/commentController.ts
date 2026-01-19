import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries.js";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { productId } = req.params;
        if (typeof productId !== "string") return res.status(400).json({ error: "Invalid productId" });
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "Comment content is required" });

        const product = await queries.getProductById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const comment = await queries.createComment({
            content,
            userId,
            productId,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { commentId } = req.params;
        if (typeof commentId !== "string") return res.status(400).json({ error: "Invalid commentId" });

        const existingComment = await queries.getCommentsById(commentId);
        if (!existingComment) return res.status(404).json({ error: "Comment not found" });

        if (existingComment.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        await queries.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};
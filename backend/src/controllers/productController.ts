import type { Request, Response } from "express";
import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts()
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const products = await queries.getproductsByuserId(userId)
        res.status(200).json( products );
    } catch (error) {
        console.error("Error fetching user's products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }
        const products = await queries.getProductById(id)

        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json( products );
    } catch (error) {
        console.error("Error fetching product by id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, description, imageUrl } = req.body

        if (!title || !description || !imageUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const product = await queries.createProduct({ useId: userId, title, description, imageUrl })

        res.status(201).json( product );
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req)
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }
        const { title, description, imageUrl } = req.body

        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (existingProduct.useId !== userId) {
            return res.status(403).json({ message: "You can only update your own products" });
        }
        const product = await queries.updateProduct(id, { title, description, imageUrl })
        res.status(200).json( product);

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: "Invalid product id" });
        }

        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.useId !== userId) {
            res.status(403).json({ error: "You can only delete your own products" });
            return;
        }

        await queries.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};
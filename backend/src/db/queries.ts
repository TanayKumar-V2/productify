import { db } from "./index.js";
import { eq } from "drizzle-orm";
import { users, comments, products, type newUser, type NewComment, type NewProduct } from "./schema.js";

export const createUser = async (data: newUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
}

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) });
}

export const updateUser = async (id: string, data: Partial<newUser>) => {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
}

export const upserUser = async (data: newUser) => {
    const existingUser = await getUserById(data.id);
    if (existingUser) {
        return updateUser(data.id, data);
    }
    return createUser(data);
}

export const createProduct = async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
}

export const getAllProducts = async () => {
    return db.query.products.findMany({ with: { user: true }, orderBy: (product, { desc }) => [desc(products.createdAt)] });
}

export const getProductById = async (id: string) => {
    return db.query.products.findFirst({ where: eq(products.id, id), with: { user: true, comments: { with: { user: true }, orderBy: (comment, { desc }) => [desc(comments.createdAt)] } } });
}

export const getproductsByuserId=async(userId:string)=>{
    return db.query.products.findMany({where:eq(products.useId,userId),with:{user:true},orderBy:(product,{desc})=>[desc(products.createdAt)]});
}

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
    const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return product;
}

export const deleteProduct = async (id: string) => {
    await db.delete(products).where(eq(products.id, id));
}

export const createComment = async (data: NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
}

export const deleteComment = async (id: string) => {
    const [comment]=await db.delete(comments).where(eq(comments.id, id)).returning();
    return comment;
}

export const getCommentsById = async (id: string) => {
    return db.query.comments.findFirst({
        where:eq(comments.id,id),
        with:{
            user:true,
        }
    })
}


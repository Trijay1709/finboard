import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// schema
export const accounts = pgTable("accounts",{
    id:text("id").primaryKey(),
    name : text ("name").notNull(),
    userId : text("user_id").notNull(),
})
export const categories = pgTable("categories",{
    id:text("id").primaryKey(),
    name : text ("name").notNull(),
    userId : text("user_id").notNull(),
})

//zod schemas
export const insertAccountSchema = createInsertSchema(accounts);
export const insertCategorySchema = createInsertSchema(categories);
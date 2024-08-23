import { accounts, categories, transactions } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon("your db url here");
export const db = drizzle(sql);

const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomAmount = (): number => {
  const isExpense = Math.random() > 0.5;
  const amount = 100 + Math.floor(Math.random() * 9900);
  return isExpense ? -amount : amount;
};

const seed = async () => {
  const userId = "user id here";

  const accountData = [
    { id: createId(), name: "Checking Account", userId },
    { id: createId(), name: "Savings Account", userId },
    { id: createId(), name: "Credit Card", userId },
  ];
  await db.insert(accounts).values(accountData);

  const categoryData = [
    { id: createId(), name: "Groceries", userId },
    { id: createId(), name: "Utilities", userId },
    { id: createId(), name: "Entertainment", userId },
    { id: createId(), name: "Travel", userId },
    { id: createId(), name: "Dining", userId },
  ];
  await db.insert(categories).values(categoryData);

  const startDate = new Date("2024-07-20");
  const endDate = new Date("2024-08-25");
  const accountIds = accountData.map((account) => account.id);
  const categoryIds = categoryData.map((category) => category.id);

  const transactionData = Array.from({ length: 20 }, () => ({
    id: createId(),
    amount: randomAmount(),
    payee: `Payee ${Math.floor(Math.random() * 100)}`,
    notes: `Note ${Math.floor(Math.random() * 100)}`,
    date: randomDate(startDate, endDate),
    accountId: accountIds[Math.floor(Math.random() * accountIds.length)],
    categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
  }));
  await db.insert(transactions).values(transactionData);

  console.log("Seeding completed!");
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
});

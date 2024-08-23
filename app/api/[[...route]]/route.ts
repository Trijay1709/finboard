import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

const app = new Hono().basePath("/api");

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/summary", summary)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;

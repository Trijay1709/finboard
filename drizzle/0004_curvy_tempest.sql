ALTER TABLE "transactions" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "payee" text NOT NULL;
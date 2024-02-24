ALTER TABLE "video" RENAME COLUMN "id" TO "uuid1";--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "uuid1" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "uuid1" SET DEFAULT gen_random_uuid();
ALTER TABLE "video" RENAME COLUMN "playCount" TO "Play Count";--> statement-breakpoint
ALTER TABLE "video" RENAME COLUMN "likes" TO "Likes Count";--> statement-breakpoint
ALTER TABLE "video" DROP CONSTRAINT "video_id_unique";--> statement-breakpoint
ALTER TABLE "video" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "Play Count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "Likes Count" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "Video Url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "Description" text NOT NULL;
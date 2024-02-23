CREATE TABLE IF NOT EXISTS "video" (
	"id" text NOT NULL,
	"playCount" integer DEFAULT 0,
	"link" integer DEFAULT 0,
	CONSTRAINT "video_id_unique" UNIQUE("id")
);

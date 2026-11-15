CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_name" varchar(200) NOT NULL,
	"client_phone" varchar(150) NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "appointments" RENAME COLUMN "user_id" TO "store_id";--> statement-breakpoint
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "store_configurations" ALTER COLUMN "day_enum" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."day_enum";--> statement-breakpoint
CREATE TYPE "public"."day_enum" AS ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');--> statement-breakpoint
ALTER TABLE "store_configurations" ALTER COLUMN "day_enum" SET DATA TYPE "public"."day_enum" USING "day_enum"::"public"."day_enum";--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;
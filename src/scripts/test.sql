-- drop table users cascade;
-- drop table tasks cascade;
-- drop table user_tasks cascade;

CREATE TABLE IF NOT EXISTS "users" (
  "email" VARCHAR(255) PRIMARY KEY NOT NULL,
  "username" VARCHAR(100) NOT NULL,
  "hash" text NOT NULL,
  "token" uuid DEFAULT uuid_generate_v1() NOT NULL,
  "confirmed" boolean
);

CREATE TABLE IF NOT EXISTS tasks (
  "id" uuid DEFAULT uuid_generate_v1() PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" varchar(1255) NOT NULL,
  "is_done" boolean,
  "priority" int NOT NULL,
  "due_date" date NOT NULL,
  "arcived" boolean NOT NULL,
  "created_at" Date NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_tasks" (
  "user_email" VARCHAR(255) NOT NULL,
  "task_id" uuid NOT NULL
);

ALTER TABLE "user_tasks" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");

ALTER TABLE "user_tasks" ADD FOREIGN KEY ("user_email") REFERENCES "users" ("email");

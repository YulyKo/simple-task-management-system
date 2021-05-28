CREATE TABLE IF NOT EXISTS "users" (
  "email" VARCHAR(255) PRIMARY KEY NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "username" VARCHAR(100) NOT NULL,
  "confirmeAt" boolean
);

CREATE TABLE IF NOT EXISTS tasks (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" varchar(1255) NOT NULL,
  "isDone" boolean,
  "priority" int NOT NULL,
  "dueDate" date NOT NULL,
  "isArcived" boolean
);

CREATE TABLE IF NOT EXISTS "user_tasks" (
  "userEmail" VARCHAR(255) NOT NULL,
  "taskId" int NOT NULL
);

ALTER TABLE "user_tasks" ADD FOREIGN KEY ("taskId") REFERENCES "tasks" ("id");

ALTER TABLE "user_tasks" ADD FOREIGN KEY ("userEmail") REFERENCES "users" ("email");

CREATE TABLE "users" (
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "username" varchar(100) NOT NULL,
  "confirmeAt" boolean
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" varchar(1255) NOT NULL,
  "isDone" boolean,
  "priority" int NOT NULL,
  "dueDate" date NOT NULL,
  "isArcived" boolean
);

CREATE TABLE "user_taks" (
  "userEmail" int NOT NULL,
  "taskId" int NOT NULL
);

ALTER TABLE "user_taks" ADD FOREIGN KEY ("taskId") REFERENCES "tasks" ("id");

ALTER TABLE "user_taks" ADD FOREIGN KEY ("userEmail") REFERENCES "users" ("email");

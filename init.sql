CREATE TABLE IF NOT EXISTS "books" (
  "id" SERIAL PRIMARY KEY,
  "author" VARCHAR(255) NOT NULL,
  "title" VARCHAR(255) NOT NULL
);
INSERT INTO "books" ("author", "title")
VALUES  ('J.K. Rowling', 'Harry Potter');

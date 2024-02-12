-- CreateTable
CREATE TABLE "recipe" (
    "id" INTEGER NOT NULL,
    "title" VARCHAR(112),
    "ingredients" VARCHAR(2378) NOT NULL,
    "instructions" VARCHAR(13952),
    "Image Name" VARCHAR(119) NOT NULL,
    "Cleaned Ingredients" VARCHAR(2379) NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `problemText` on the `PortfolioCase` table. All the data in the column will be lost.
  - You are about to drop the column `resultText` on the `PortfolioCase` table. All the data in the column will be lost.
  - You are about to drop the column `solutionText` on the `PortfolioCase` table. All the data in the column will be lost.
  - Added the required column `description` to the `PortfolioCase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PortfolioCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PortfolioCase" ("category", "createdAt", "id", "isPublished", "sortOrder", "title", "updatedAt") SELECT "category", "createdAt", "id", "isPublished", "sortOrder", "title", "updatedAt" FROM "PortfolioCase";
DROP TABLE "PortfolioCase";
ALTER TABLE "new_PortfolioCase" RENAME TO "PortfolioCase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

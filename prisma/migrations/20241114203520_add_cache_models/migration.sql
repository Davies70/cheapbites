/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `ttl` on the `ImageCache` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `ttl` on the `OtherCache` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `ttl` on the `PlaceCache` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImageCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" DATETIME NOT NULL
);
INSERT INTO "new_ImageCache" ("key", "ttl", "value") SELECT "key", "ttl", "value" FROM "ImageCache";
DROP TABLE "ImageCache";
ALTER TABLE "new_ImageCache" RENAME TO "ImageCache";
CREATE TABLE "new_OtherCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" DATETIME NOT NULL
);
INSERT INTO "new_OtherCache" ("key", "ttl", "value") SELECT "key", "ttl", "value" FROM "OtherCache";
DROP TABLE "OtherCache";
ALTER TABLE "new_OtherCache" RENAME TO "OtherCache";
CREATE TABLE "new_PlaceCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" DATETIME NOT NULL
);
INSERT INTO "new_PlaceCache" ("key", "ttl", "value") SELECT "key", "ttl", "value" FROM "PlaceCache";
DROP TABLE "PlaceCache";
ALTER TABLE "new_PlaceCache" RENAME TO "PlaceCache";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

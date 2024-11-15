-- CreateTable
CREATE TABLE "PlaceCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ImageCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "OtherCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" INTEGER NOT NULL
);

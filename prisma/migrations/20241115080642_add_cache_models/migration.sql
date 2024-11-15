-- CreateTable
CREATE TABLE "PlacesCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ImagesCache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "ttl" DATETIME NOT NULL
);

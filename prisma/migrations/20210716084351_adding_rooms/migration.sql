/*
  Warnings:

  - Added the required column `roomId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "routerId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    FOREIGN KEY ("routerId") REFERENCES "Router" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "routerId" INTEGER NOT NULL,
    "deviceCategoryId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    FOREIGN KEY ("deviceCategoryId") REFERENCES "DeviceCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("details", "deviceCategoryId", "id", "ip", "name", "routerId", "version") SELECT "details", "deviceCategoryId", "id", "ip", "name", "routerId", "version" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

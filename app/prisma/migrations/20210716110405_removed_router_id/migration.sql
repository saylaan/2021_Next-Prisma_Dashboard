/*
  Warnings:

  - You are about to drop the `Router` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `deviceId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `routerId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `routerId` on the `Device` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Router";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Room" ("id", "name") SELECT "id", "name" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "deviceCategoryId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    FOREIGN KEY ("deviceCategoryId") REFERENCES "DeviceCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("details", "deviceCategoryId", "id", "ip", "name", "roomId", "version") SELECT "details", "deviceCategoryId", "id", "ip", "name", "roomId", "version" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

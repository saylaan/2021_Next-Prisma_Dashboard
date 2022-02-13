/*
  Warnings:

  - Added the required column `roomId` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "sensorCategoryId" INTEGER NOT NULL,
    "sensorDataId" INTEGER NOT NULL,
    "sensorDataTypeId" INTEGER NOT NULL,
    FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sensorCategoryId") REFERENCES "SensorCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataId") REFERENCES "SensorData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataTypeId") REFERENCES "SensorDataType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Sensor" ("id", "ip", "name", "sensorCategoryId", "sensorDataId", "sensorDataTypeId", "version") SELECT "id", "ip", "name", "sensorCategoryId", "sensorDataId", "sensorDataTypeId", "version" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

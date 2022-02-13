-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "deviceCategoryId" INTEGER,
    "roomId" INTEGER,
    FOREIGN KEY ("deviceCategoryId") REFERENCES "DeviceCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("details", "deviceCategoryId", "id", "ip", "name", "roomId", "version") SELECT "details", "deviceCategoryId", "id", "ip", "name", "roomId", "version" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "roomId" INTEGER,
    "sensorCategoryId" INTEGER,
    "sensorDataId" INTEGER,
    "sensorDataTypeId" INTEGER,
    FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("sensorCategoryId") REFERENCES "SensorCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataId") REFERENCES "SensorData" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataTypeId") REFERENCES "SensorDataType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Sensor" ("id", "ip", "name", "roomId", "sensorCategoryId", "sensorDataId", "sensorDataTypeId", "version") SELECT "id", "ip", "name", "roomId", "sensorCategoryId", "sensorDataId", "sensorDataTypeId", "version" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

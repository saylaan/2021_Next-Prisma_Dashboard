-- CreateTable
CREATE TABLE "Router" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "routerId" INTEGER NOT NULL,
    "deviceCategoryId" INTEGER NOT NULL,
    FOREIGN KEY ("routerId") REFERENCES "Router" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("deviceCategoryId") REFERENCES "DeviceCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeviceCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_at" DATETIME NOT NULL,
    "end_at" DATETIME NOT NULL,
    "trigger_condition" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "sensorCategoryId" INTEGER NOT NULL,
    "sensorDataId" INTEGER NOT NULL,
    "sensorDataTypeId" INTEGER NOT NULL,
    FOREIGN KEY ("sensorCategoryId") REFERENCES "SensorCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataId") REFERENCES "SensorData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sensorDataTypeId") REFERENCES "SensorDataType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SensorDataType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SensorDataToSensorDataType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "SensorData" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "SensorDataType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCategory.name_unique" ON "DeviceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SensorCategory.name_unique" ON "SensorCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SensorDataToSensorDataType_AB_unique" ON "_SensorDataToSensorDataType"("A", "B");

-- CreateIndex
CREATE INDEX "_SensorDataToSensorDataType_B_index" ON "_SensorDataToSensorDataType"("B");

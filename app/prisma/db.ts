import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const db =
{
    prisma: prisma,

    rooms : {
        getAllRooms: async function () { 
            return (
                await prisma.room.findMany()
            )
        },
    
        getOneRoom: async function (id: any) { 
            return (await prisma.room.findUnique(
                {
                    where: {
                        id: id
                    }
                }
                )
            )
        },
    
        createRoom: async function (room: Prisma.RoomCreateInput) {
            return (
                await prisma.room.create(
                    {
                        data: room
                    }
                )
            )
        },
    
        modifyOneRoom: async function (id:any, room: Prisma.RoomCreateInput) {
            return (
                await prisma.room.update(
                    {
                        where: {
                            id: id
                        }, 
                        data: room
                    }
                )
            )
        },
    
        deleteOneRoom: async function (id: any) {
            return (
                await prisma.room.delete(
                    {
                        where: {
                            id: id
                        }
                    }
                )
            )
        },

        linkDeviceToRoom: async function (room_id: any, device_id: any) {
            return (
                await prisma.device.update({
                    where: {
                        id: device_id
                    },
                    data: {
                        roomId: room_id
                    }
                })
            )
        },

        unlinkDeviceToRoom: async function (device_id: any) {
            return (
                await prisma.device.update({
                    where: {
                        id: device_id
                    },
                    data: {
                        roomId: null
                    }
                })
            )
        },

        linkSensorToRoom: async function (room_id: any, sensor_id: any) {
            return (
                await prisma.sensor.update({
                    where: {
                        id: sensor_id
                    },
                    data: {
                        roomId: room_id
                    }
                })
            )
        },

        unlinkSensorToRoom: async function (sensor_id: any) {
            return (
                await prisma.sensor.update({
                    where: {
                        id: sensor_id
                    },
                    data: {
                        roomId: null
                    }
                })
            )
        }
    },
    devices: {
        getAllDevices: async function () { 
            return (
                await prisma.device.findMany()
            )
        },
    
        getOneDevice: async function (id: any) { 
            return (await prisma.device.findUnique(
                {
                    where: {
                        id: id
                    }
                }
                )
            )
        },

        getAllDevicesForRoom: async function (id: any) {
            return (await prisma.device.findMany(
                {
                    where: {
                        roomId: id
                    }
                }
            ))
        },
    
        createDevice: async function (Device: Prisma.DeviceCreateInput) {
            return (
                await prisma.device.create(
                    {
                        data: Device
                    }
                )
            )
        },
    
        modifyOneDevice: async function (id:any, Device: Prisma.DeviceCreateInput) {
            return (
                await prisma.device.update(
                    {
                        where: {
                            id: id
                        }, 
                        data: Device
                    }
                )
            )
        },
    
        deleteOneDevice: async function (id: any) {
            return (
                await prisma.device.delete(
                    {
                        where: {
                            id: id
                        }
                    }
                )
            )
        },

        getAllDeviceCategory: async function () {
            return (
                await prisma.deviceCategory.findMany()
            )
        },

        getDeviceCategory: async function (id: any) {
            return (
                await prisma.deviceCategory.findFirst(
                    {
                        where: {
                            id: id
                        }
                    }
                )
            )
        },

        createCategory: async function (category: Prisma.DeviceCategoryCreateInput) {
            return (
                await prisma.deviceCategory.create({
                    data: category
                })
            )
        },

        modifyCategory: async function (id:any, category: Prisma.DeviceCategoryCreateInput) {
            return (
                await prisma.deviceCategory.update({
                    where: {
                        id: id
                    },
                    data: category
                })
            )
        },

        deleteCategory: async function (id: any) {
            return (
                await prisma.deviceCategory.delete({
                    where: {
                        id: id
                    }
                })
            )
        }
    },
    sensors : {
        getAllSensors: async function () { 
            return (
                await prisma.sensor.findMany()
            )
        },
    
        getOneSensor: async function (id: any) { 
            return (await prisma.sensor.findUnique(
                {
                    where: {
                        id: id
                    }
                }
                )
            )
        },

        getAllSensorsForRoom: async function (id: any) {
            return (await prisma.sensor.findMany(
                {
                    where: {
                        roomId: id
                    }
                }
            ))
        },
    
        createSensor: async function (Sensor: Prisma.SensorCreateInput) {
            return (
                await prisma.sensor.create(
                    {
                        data: Sensor
                    }
                )
            )
        },
    
        modifyOneSensor: async function (id:any, Sensor: Prisma.SensorCreateInput) {
            return (
                await prisma.sensor.update(
                    {
                        where: {
                            id: id
                        }, 
                        data: Sensor
                    }
                )
            )
        },
    
        deleteOneSensor: async function (id: any) {
            return (
                await prisma.sensor.delete(
                    {
                        where: {
                            id: id
                        }
                    }
                )
            )
        },
        
        getAllSensorCategory: async function () {
            return (
                await prisma.sensorCategory.findMany()
            )
        },

        getOneSensorCategory: async function (id: any) {
            return (
                await prisma.sensorCategory.findFirst(
                    {
                        where: {
                            id: id
                        }
                    }
                )
            )
        },

        createSensorCategory: async function (category: Prisma.SensorCategoryCreateInput) {
            return (
                await prisma.sensorCategory.create({
                    data: category
                })
            )
        },

        modifySensorCategory: async function (id: any, category: Prisma.SensorCategoryCreateInput) {
            return (
                await prisma.sensorCategory.update({
                    where: {
                        id: id
                    },
                    data: category
                })
            )
        },

        deleteSensorCategory: async function (id: any) {
            return (
                await prisma.sensorCategory.delete({
                    where: {
                        id: id
                    }
                })
            )
        },

        getAllSensorDatas: async function () {
            return (
                await prisma.sensorData.findMany()
            )
        },

        getSensorData: async function (id: any) {
            return (
                await prisma.sensorData.findFirst({
                    where: {
                        id: id
                    }
                })
            )
        },

        createSensorData: async function (data: Prisma.SensorDataCreateInput) {
            return (
                await prisma.sensorData.create({
                    data: data
                })
            )
        },

        modifySensorData: async function (id: any, data: Prisma.SensorDataCreateInput) {
            return (
                await prisma.sensorData.update({
                    where: {
                        id: id
                    },
                    data: data
                })
            )
        },

        deleteSensorData: async function (id: any) {
            return (
                await prisma.sensorData.delete({
                    where: {
                        id: id
                    }
                })
            )
        },

        getAllSensorDataType: async function () {
            return (
                await prisma.sensorDataType.findMany()
            )
        },

        getOneSensorDataType: async function (id: any) {
            return (
                await prisma.sensorDataType.findFirst({
                    where: {
                        id: id
                    }
                })
            )
        },

        createSensorDataType: async function (type: Prisma.SensorDataTypeCreateInput) {
            return (
                await prisma.sensorDataType.create({
                    data: type
                })
            )
        },

        modifySensorDataType: async function (id: any, type: Prisma.SensorDataTypeCreateInput) {
            return (
                await prisma.sensorDataType.update({
                    where: {
                        id: id
                    },
                    data: type
                })
            )
        },

        deleteSensorDataType: async function (id: any) {
            return (
                await prisma.sensorDataType.delete({
                    where: {
                        id: id
                    }
                })
            )
        }
    }
}

export default db;
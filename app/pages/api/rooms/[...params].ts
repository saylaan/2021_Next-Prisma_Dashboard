import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {params} = req.query;
    const {room} = req.body;

    const id = params[0];

    var slug;
    var item;
    var item_id;

    if (params.length > 1) {
        slug = params[1];
    }
    if (params.length > 2) {
        item = params[2];
    }
    if (params.length > 3) {
        item_id = params[3]
    }

    switch (req.method) {
        case 'GET':
            if(slug === undefined) {
                db.rooms.getOneRoom(parseInt(id)).then((data) => {
                    res.status(200).json({message: 'The room data', room: data})
                }).catch((err) => {
                    console.error(err)
                    res.status(400).json({message: 'error'})
                })    
            } else {
                if (slug === "devices") {
                    db.devices.getAllDevicesForRoom(parseInt(id)).then((data) => {
                        res.status(200).json({message: 'devices', device: data})
                    }).catch((err) => {
                        console.error(err)
                        res.status(400).json({message: 'error'})
                    })
                } else if (slug === "sensors") {
                    db.sensors.getAllSensorsForRoom(parseInt(id)).then((data) => {
                        res.status(200).json({message: 'sensors', sensor: data})
                    }).catch((err) => {
                        console.error(err)
                        res.status(400).json({message: 'error'})
                    })
                } else {
                    res.status(404).json({message: 'wrong path'})                
                }
            }
            break;
        case 'PATCH':
            if (slug === undefined) {
                db.rooms.modifyOneRoom(parseInt(id), room).then((data) => {
                    res.status(200).json({message: 'room modified', room: data})
                }).catch((err) => {
                    console.error(err)
                    res.status(400).json({message: 'error'})
                })    
            } else {
                if (slug === "link") {
                    if (item === undefined) {
                        res.status(404).json({message: 'wrong path'})
                    } else if (item === "device") {
                        if (item_id === undefined) {
                            res.status(404).json({message: 'wrong path'})
                        } else {
                            db.rooms.linkDeviceToRoom(parseInt(id), parseInt(item_id)).then(() => {
                                res.status(200).json({message: 'linked'})
                            })
                        }
                    } else if (item === "sensor") {
                        if (item_id === undefined) {
                            res.status(404).json({message: 'wrong path'})
                        } else {
                            db.rooms.linkSensorToRoom(parseInt(id), parseInt(item_id)).then(() => {
                                res.status(200).json({message: 'linked'})
                            })
                        }
                    } else {
                        res.status(404).json({message: 'wrong path'})
                    }
                } else {
                    res.status(404).json({message: 'wrong path'})                
                }
            }
            break;
        case 'DELETE':
            if (slug === undefined) {
                db.rooms.deleteOneRoom(parseInt(id)).then((data) => {
                    res.status(200).json({message: 'room deleted', room: data})
                }).catch((err) => {
                    console.error(err)
                    res.status(400).json({message: 'error'})
                })    
            } else {
                if (slug === "link") {
                    if (item === undefined) {
                        res.status(404).json({message: 'wrong path'})
                    } else if (item === "device") {
                        if (item_id === undefined) {
                            res.status(404).json({message: 'wrong path'})
                        } else {
                            db.rooms.unlinkDeviceToRoom(parseInt(item_id)).then(() => {
                                res.status(200).json({message: 'unlinked'})
                            }).catch(() => {
                                res.status(400).json({message: "error can't unlink"})
                            })
                        }
                    } else if (item === "sensor") {
                        if (item_id === undefined) {
                            res.status(404).json({message: 'wrong path'})
                        } else {
                            db.rooms.unlinkSensorToRoom(parseInt(item_id)).then(() => {
                                res.status(200).json({message: 'unlinked'})
                            }).catch(() => {
                                res.status(400).json({message: "error can't unlink"})
                            })
                        }
                    } else {
                        res.status(404).json({message: 'wrong path'})
                    }
                } else {
                    res.status(404).json({message: 'wrong path'})                
                }
            }
            break;
        default:
            res.status(405).json({message: 'Only GET,PATCH,DELETE Allowed'})
    }
}
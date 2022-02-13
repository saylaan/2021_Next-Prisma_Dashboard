import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {params} = req.query;
    const {sensor_data} = req.body;

    const id = params[0];

    switch (req.method) {
        case 'GET':
            db.sensors.getSensorData(parseInt(id)).then((data) => {
                res.status(200).json({message: 'The sensor data', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'PATCH':
            db.sensors.modifySensorData(parseInt(id), sensor_data).then((data) => {
                res.status(200).json({message: 'sensor data modified', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'DELETE':
            db.sensors.deleteSensorData(parseInt(id)).then((data) => {
                res.status(200).json({message: 'sensor data deleted', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,PATCH,DELETE Allowed'})
    }
}
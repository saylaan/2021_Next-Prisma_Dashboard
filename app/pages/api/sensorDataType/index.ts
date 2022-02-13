import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {sensor_data_type} = req.body;

    switch (req.method) {
        case 'GET':
            db.sensors.getAllSensorDataType().then((data) => {
                res.status(200).json({message: 'all sensor data types', sensor: data})
            })
            break;
        case 'POST':
            db.sensors.createSensorDataType(sensor_data_type).then((data) => {
                res.status(200).json({message: 'sensor data saved', sensor: data})
            })
            break;
        default:
            res.status(405).json({message: 'Only POST Allowed'})
    }
}
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {sensor_data} = req.body;

    switch (req.method) {
        case 'GET':
            db.sensors.getAllSensorDatas().then((data) => {
                res.status(200).json({message: 'all sensor datas', sensor: data})
            })
            break;
        case 'POST':
            db.sensors.createSensorData(sensor_data).then((data) => {
                res.status(200).json({message: 'sensor data saved', sensor: data})
            })
            break;
        default:
            res.status(405).json({message: 'Only POST Allowed'})
    }
}
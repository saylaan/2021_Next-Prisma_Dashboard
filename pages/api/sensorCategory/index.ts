import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {sensor_category} = req.body;

    switch (req.method) {
        case 'GET':
            db.sensors.getAllSensorCategory().then((data) => {
                res.status(200).json({message: 'sensor categories', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'POST':
            db.sensors.createSensorCategory(sensor_category).then((data) => {
                res.status(200).json({message: 'sensor category created', sensor: data})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,POST Allowed'})
    }
}
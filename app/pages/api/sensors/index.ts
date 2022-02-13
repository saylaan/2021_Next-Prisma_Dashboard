import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {sensor} = req.body;
    
    switch (req.method) {
        case 'GET':
            db.sensors.getAllSensors().then((data) => {
                res.status(200).json({message: 'all sensors', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'POST':
            db.sensors.createSensor(sensor).then((data) => {
                res.status(200).json({message: 'create sensor', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,POST Allowed'})
    }
}
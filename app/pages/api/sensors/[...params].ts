import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {params} = req.query;
    const {sensor} = req.body;

    const id = params[0];

    switch (req.method) {
        case 'GET':
            db.sensors.getOneSensor(parseInt(id)).then((data) => {
                res.status(200).json({message: 'The sensor data', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })    
            break;
        case 'PATCH':
            db.sensors.modifyOneSensor(parseInt(id), sensor).then((data) => {
                res.status(200).json({message: 'sensor modified', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'DELETE':
            db.sensors.deleteOneSensor(parseInt(id)).then((data) => {
                res.status(200).json({message: 'sensor deleted', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,PATCH,DELETE Allowed'})
    }
}
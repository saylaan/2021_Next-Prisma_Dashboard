import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {params} = req.query;
    const {sensor_data_type} = req.body;

    const id = params[0];

    switch (req.method) {
        case 'GET':
            db.sensors.getOneSensorDataType(parseInt(id)).then((data) => {
                res.status(200).json({message: 'The sensor data type', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'PATCH':
            db.sensors.modifySensorDataType(parseInt(id), sensor_data_type ).then((data) => {
                res.status(200).json({message: 'sensor data type modified', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'DELETE':
            db.sensors.deleteSensorDataType(parseInt(id)).then((data) => {
                res.status(200).json({message: 'sensor data type deleted', sensor: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,PATCH,DELETE Allowed'})
    }
}
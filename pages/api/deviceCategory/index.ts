import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {device_category} = req.body;

    switch (req.method) {
        case 'GET':
            db.devices.getAllDeviceCategory().then((data) => {
                res.status(200).json({message: 'The device categories', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'POST':
            db.devices.createCategory(device_category).then((data) => {
                res.status(200).json({message: 'device category created', device: data})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,POST Allowed'})
    }
}
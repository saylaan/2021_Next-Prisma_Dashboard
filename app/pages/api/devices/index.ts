import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {device} = req.body;
    
    switch (req.method) {
        case 'GET':
            db.devices.getAllDevices().then((data) => {
                res.status(200).json({message: 'all devices', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'POST':
            db.devices.createDevice(device).then((data) => {
                res.status(200).json({message: 'create device', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only POST Allowed'})
    }
}
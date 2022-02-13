import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {params} = req.query;
    const {device_category} = req.body;

    const id = params[0];

    switch (req.method) {
        case 'GET':
            db.devices.getDeviceCategory(parseInt(id)).then((data) => {
                res.status(200).json({message: 'The device category', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'PATCH':
            db.devices.modifyCategory(parseInt(id), device_category).then((data) => {
                res.status(200).json({message: 'device category modified', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'DELETE':
            db.devices.deleteCategory(parseInt(id)).then((data) => {
                res.status(200).json({message: 'device deleted', device: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,PATCH,DELETE Allowed'})
    }
}
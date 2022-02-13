import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../prisma/db'

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const {room} = req.body;
    
    switch (req.method) {
        case 'GET':
            db.rooms.getAllRooms().then((data) => {
                res.status(200).json({message: 'all rooms', room: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        case 'POST':
            db.rooms.createRoom(room).then((data) => {
                res.status(200).json({message: 'create room', room: data})
            }).catch((err) => {
                console.error(err)
                res.status(400).json({message: 'error'})
            })
            break;
        default:
            res.status(405).json({message: 'Only GET,POST Allowed'})
    }
}
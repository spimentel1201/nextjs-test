import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { IUser } from '../../../interface'
import { User } from '../../../models'

type Data = { message: string } | Partial<IUser[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getUsersMttos(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getUsersMttos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()

    const users = await User.find({ $or: [{ rol: 'admin_mtto' }, { rol: 'mtto' }] })
        .select(' -_id -email -contrasena -createdAt -updatedAt -__v')
        .sort({ updatedAt: -1 })
        .lean()

    await db.disconnect()

    return res.status(200).send(users)
}

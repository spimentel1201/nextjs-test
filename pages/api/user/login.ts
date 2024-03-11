import type { NextApiRequest, NextApiResponse } from 'next'

import bcryptjs from 'bcryptjs'

import { db } from '../../../database'
import { User } from '../../../models'
import { jwtServ } from '../../../utils'

type Data =
    | { message: string }
    | {
          token: string
          user: {
              email: string
              rol: string
              nombre: string
          }
      }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(400).json({
                message: 'Bad Request',
            })
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', contrasena = '' } = req.body

    await db.connect()
    const user = await User.findOne({ email })

    await db.disconnect()

    if (!user) {
        return res.status(404).json({ message: 'contraseña o email inválidos' })
    }

    if (!bcryptjs.compareSync(contrasena, user.contrasena)) {
        return res.status(404).json({ message: 'contraseña o email inválidos' })
    }

    const { rol, nombre, _id } = user

    const token = jwtServ.signToken(_id, email)

    return res.status(200).json({
        token,
        user: { email, rol, nombre },
    })
}

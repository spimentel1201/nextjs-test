import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { IInventario } from '../../../interface'
import { Inventario } from '../../../models'

type Data = { message: string } | Partial<IInventario[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getReplacementsIds(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getReplacementsIds = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()

    const inventorys = await Inventario.find({ tipoInventario: 'repuesto' })
        .select(
            ' -estado -fechaDeEntrada -fechaDeActualizacion -imagenes -capacidadNominal -serie -marca -voltaje -corriente -observacionGeneral -locacion -subLocacion -coordenadas_gps -maquina_id_relacion -tipoInventario -imgQR -__v -createdAt -updatedAt -id_repuesto',
        )
        .sort({ updatedAt: -1 })
        .lean()

    await db.disconnect()

    return res.status(200).send(inventorys)
}

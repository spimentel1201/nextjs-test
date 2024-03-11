import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { IInventario } from '../../../interface'
import { Inventario } from '../../../models'

type Data = { message: string } | Partial<IInventario[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getMachinesIds(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getMachinesIds = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()

    const inventorys = await Inventario.find({ tipoInventario: 'maquina' })
        .select(
            ' -nombre -estado -fechaDeEntrada -fechaDeActualizacion -imagenes -capacidadNominal -serie -marca -voltaje -corriente -observacionGeneral -locacion -subLocacion -existencia -coordenadas_gps -maquina_id_relacion -id_repuesto -tipoInventario -imgQR -__v -createdAt -updatedAt',
        )
        .sort({ id_maquina: 1 })
        .lean()

    await db.disconnect()

    return res.status(200).send(inventorys)
}

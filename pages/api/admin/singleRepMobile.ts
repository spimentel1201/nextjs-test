import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { IInventario } from '../../../interface'
import { Inventario } from '../../../models'

type Data = { message: string } | IInventario | Partial<IInventario>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getSingleRep(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getSingleRep = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // const page: number = parseInt(req.query.page as any) || 1
    // const limit: number = parseInt(req.query.limit as any) || 10
    const { _id = '' } = req.query as {
        _id: string
    }

    await db.connect()

    let singleRep = await Inventario.findById(_id).sort({ updatedAt: -1 }).lean()

    console.log({ singleRep })
    await db.disconnect()

    if (!singleRep) {
        return res.status(400).json({ message: 'No result found' })
    }
    await db.connect()
    let arrMaq = []

    for (let i = 0; i < singleRep.maquina_id_relacion?.length!; i++) {
        if (singleRep.maquina_id_relacion != undefined) {
            let resMaq = await Inventario.find({
                tipoInventario: 'maquina',
                id_maquina: singleRep?.maquina_id_relacion[i]!,
            })
                .select(
                    ' -estado -fechaDeEntrada -fechaDeActualizacion  -capacidadNominal -serie -voltaje -corriente -observacionGeneral -locacion -subLocacion -existencia -coordenadas_gps -maquina_id_relacion -id_repuesto -tipoInventario -imgQR -__v -createdAt -updatedAt -id_maquina',
                )
                .lean()

            if (resMaq) {
                arrMaq.push(resMaq[0])
            }
        }
    }
    singleRep['arrMaq'] = arrMaq

    return res.status(200).send(singleRep)
}

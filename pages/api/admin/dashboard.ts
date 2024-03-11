import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { Inventario, OT, Seguimiento, User } from '../../../models'

type Data = {
    numberOts: number
    numberMachines: number
    numberReplacements: number
    numberUsers: number
    numberOutStock: number
    numberLowStocks: number
    numberFollows: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect()

    const [numberOts, numberMachines, numberReplacements, numberUsers, numberOutStock, numberLowStocks, numberFollows] =
        await Promise.all([
            OT.count(),
            Inventario.find({ tipoInventario: 'maquina' }).count(),
            Inventario.find({ tipoInventario: 'repuesto' }).count(),
            User.count(),
            Inventario.find({ existencia: 0 }).count(),
            Inventario.find({ existencia: { $lte: 10, $gte: 1 } }).count(),
            Seguimiento.count(),
        ])

    await db.disconnect()

    res.status(200).json({
        numberOts,
        numberMachines,
        numberReplacements,
        numberUsers,
        numberOutStock,
        numberLowStocks,
        numberFollows,
    })
}

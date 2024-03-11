import type { NextApiRequest, NextApiResponse } from 'next'

import { db, seedDatabase } from '../../database'
import { User, Inventario, OT, Seguimiento, CounterTable } from '../../models'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a esta API' })
    }

    await db.connect()

    await User.deleteMany()
    await User.insertMany(seedDatabase.initialData.usuarios)

    //TODO: implementar las siguientes purgas de datos con su respectiva inserción en la database
    await Inventario.deleteMany()
    await Inventario.insertMany(seedDatabase.initialData.inventarios)

    await OT.deleteMany()
    await OT.insertMany(seedDatabase.initialData.ots)

    await Seguimiento.deleteMany()
    await Seguimiento.insertMany(seedDatabase.initialData.seguimientos)

    await CounterTable.deleteMany()
    await CounterTable.insertMany(seedDatabase.initialData.counterTable)

    await db.disconnect()

    res.status(200).json({ message: 'Usuarios, Inventarios, OTs y seguimientos cargados exitosamente' })
}

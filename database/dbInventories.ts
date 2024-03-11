import { IInventario } from '../interface'
import { Inventario } from '../models'

import { db } from '.'

export const getProductById = async (id: string): Promise<IInventario | null> => {
    await db.connect()

    const inventory = await Inventario.findById(id).lean()

    await db.disconnect()

    if (!inventory) {
        return null
    }

    //con esto forzamos al objeto a que sea serealizado como un string
    return JSON.parse(JSON.stringify(inventory))
}

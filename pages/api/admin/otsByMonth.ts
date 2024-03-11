import type { NextApiRequest, NextApiResponse } from 'next'

import { IOT } from '../../../interface'
import { db } from '../../../database'
import { OT } from '../../../models'
type Data = { message: string } | Array<{ fecha_expedicion: Date }>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getOTsByMonth(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}
const getOTsByMonth = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { searchParams = '', fecha_expedicion } = req.query as {
        searchParams: string
        slug: string
        numero_de_orden_de_compra: string
        fecha_expedicion: string
        fecha_cierre: string
        fecha_expedicion_exacta: string
        ot_id: string
    }

    const regex = new RegExp(searchParams.toString() as string, 'i')

    await db.connect()
    try {
        const ots = await OT.find({
            fecha_expedicion: fecha_expedicion
                ? {
                      $gte: new Date(`${fecha_expedicion}-1`).toISOString(),
                      $lte: new Date(`${fecha_expedicion}-31`).toISOString(),
                  }
                : regex,
        })
            .select(
                '-ot_id -slug -repuesto -tecnico_ing -estado_de_OT -numero_de_orden_de_compra -tiempoDeEjecucion -fecha_cierre -imgDeLaMaquina -tareas -comentario -maquina -createdAt -updatedAt',
            )
            .sort({ updatedAt: -1 })
            .lean()

        await db.disconnect()

        return res.status(200).send(ots)
    } catch (error) {
        console.log('errorMsm ===>', error)
        await db.disconnect()
        res.status(400).send({ message: 'internals logs' })
    }
}

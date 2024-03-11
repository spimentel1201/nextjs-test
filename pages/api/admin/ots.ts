import type { NextApiRequest, NextApiResponse } from 'next'

import { IOT } from '../../../interface'
import { db } from '../../../database'
import { CounterTable, OT } from '../../../models'
type Data = { message: string } | IOT[] | IOT | Partial<IOT[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getOTs(req, res)
        case 'POST':
            return createOT(req, res)
        case 'PUT':
            return updateOT(req, res)
        case 'DELETE':
            return deleteOT(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}
const getOTs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // const page: number = parseInt(req.query.page as any) || 1
    // const limit: number = parseInt(req.query.limit as any) || 10
    const {
        searchParams = '',
        slug,
        numero_de_orden_de_compra,
        fecha_expedicion,
        fecha_expedicion_exacta,
        ot_id,
    } = req.query as {
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

    // const total = await User.find({ $or: [{ nombre: regex }, { rol: regex }] }).count()
    // const last_page = Math.ceil(total / limit)
    // let previous_page = null
    // let next_page = null

    // if (page > last_page) {
    //     return res.status(400).json({ message: 'you exceeded the maximum pages' })
    // }

    // if (Math.sign(last_page - page) === 1) next_page = true
    // if ((Math.sign(page - last_page) === -1 || Math.sign(page - last_page) === 0) && page !== 1) previous_page = true
    try {
        const ots = await OT.find({
            $or: [
                { slug: slug ? slug : regex },
                { numero_de_orden_de_compra: numero_de_orden_de_compra ? numero_de_orden_de_compra : regex },
            ],
            ot_id: ot_id ? ot_id : regex,
            fecha_expedicion: fecha_expedicion
                ? {
                      $gte: new Date(`${fecha_expedicion}-1`).toISOString(),
                      $lte: new Date(`${fecha_expedicion}-31`).toISOString(),
                  }
                : fecha_expedicion_exacta
                ? {
                      $gte: `${fecha_expedicion_exacta}T00:00:00.000Z`,
                      $lte: `${fecha_expedicion_exacta}T23:59:59:999Z`,
                  }
                : regex,
        })
            .sort({ updatedAt: -1 })
            // .skip((page - 1) * limit)
            // .limit(limit)
            .lean()

        // console.log({ ots })
        await db.disconnect()

        return res.status(200).send(
            ots,
            // page,
            // limit,
            // last_page,
            // previous_page,
            // next_page,
            // total,
        )
    } catch (error) {
        console.log('errorMsm ===>', error)
        await db.disconnect()
        res.status(400).send({ message: 'internals logs' })
    }
}

const createOT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        slug = '',
        tecnico_ing = '',
        estado_de_OT = '',
        // fecha_expedicion = '',
        tiempoDeEjecucion = '',
        // fecha_cierre = '',
        imgDeLaMaquina = '',
        // tareas = '',
        // comentario = '',
        maquina = '',
    } = req.body as IOT

    if (typeof slug !== 'string' || slug.length < 3) {
        return res.status(400).json({ message: 'The slug has to be a string with 3 or more characters' })
    }

    if (req.body.repuesto && typeof req.body?.repuesto !== 'string') {
        return res.status(400).json({ message: 'The spare has to be a string' })
    }

    if (typeof tecnico_ing !== 'string' || tecnico_ing.length < 3) {
        return res.status(400).json({ message: 'The technical engineer has to be a string with 3 or more characters' })
    }

    if (!['pendiente', 'en_proceso', 'finalizada'].includes(estado_de_OT)) {
        return res.status(400).json({ message: 'The status of the OT is not valid' })
    }

    if (
        req.body.numero_de_orden_de_compra &&
        (typeof req.body?.numero_de_orden_de_compra !== 'string' || req.body?.numero_de_orden_de_compra.length < 2)
    ) {
        return res
            .status(400)
            .json({ message: 'The purchase order number engineer has to be a string with 3 or more characters' })
    }

    if (req.body.tiempoDeEjecucion && typeof req.body?.tiempoDeEjecucion !== 'number') {
        return res.status(400).json({ message: 'Execution time must be a number' })
    }

    if (typeof imgDeLaMaquina !== 'string' || imgDeLaMaquina.length < 7) {
        return res
            .status(400)
            .json({ message: 'The image of the machine must be a string of 8 or more characters and be at string' })
    }

    if (req.body.tareas && req.body?.tareas.length < 2) {
        return res.status(400).json({ message: 'Tasks must have more than 2 characters' })
    }

    if (req.body.comentario && req.body?.comentario.length < 2) {
        return res.status(400).json({ message: 'The comments must have more than 2 characters' })
    }

    if (typeof maquina !== 'number') {
        return res.status(400).json({ message: 'The machine has to be a string with 3 or more characters' })
    }

    await db.connect()

    const otTesting = await OT.findOne({ slug })

    if (otTesting) {
        return res.status(400).json({ message: 'Slug already exists' })
    }

    try {
        const resOT = await CounterTable.findOne({ idOT: 'autoIDOT' })

        let seqId: Number = 0

        if (!resOT) {
            const newVal = new CounterTable({ idOT: 'autoIDOT', seqOT: 1 })

            await newVal.save({ validateBeforeSave: true })

            seqId = 1
        } else {
            seqId = (resOT.seqOT as number) + 1
            await resOT.updateOne({ seqOT: (resOT.seqOT as number) + 1 })
        }

        const newOT = new OT({ ...req.body, ot_id: seqId })

        await newOT.save({ validateBeforeSave: true })

        await db.disconnect()

        return res.status(201).json({ message: 'OTs created successfully' })
    } catch (err) {
        console.log('error catch ===>', err)
        await db.disconnect()

        return res.status(500).json({ message: 'review server logs' })
    }
}

const updateOT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as IOT

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    if (req.body.slug && (typeof req.body?.slug !== 'string' || req.body?.slug.length < 3)) {
        return res.status(400).json({ message: 'The slug has to be a string with 3 or more characters' })
    }

    if (req.body.repuesto && typeof req.body?.repuesto !== 'string') {
        return res.status(400).json({ message: 'The spare has to be a string' })
    }

    if (req.body.tecnico_ing && (typeof req.body?.tecnico_ing !== 'string' || req.body?.tecnico_ing.length < 3)) {
        return res.status(400).json({ message: 'The technical engineer has to be a string with 3 or more characters' })
    }

    if (req.body.estado_de_OT && !['pendiente', 'en_proceso', 'finalizada'].includes(req.body.estado_de_OT)) {
        return res.status(400).json({ message: 'The status of the OT is not valid' })
    }

    if (
        req.body.numero_de_orden_de_compra &&
        (typeof req.body?.numero_de_orden_de_compra !== 'string' || req.body?.numero_de_orden_de_compra.length < 3)
    ) {
        return res
            .status(400)
            .json({ message: 'The purchase order number engineer has to be a string with 3 or more characters' })
    }

    if (req.body.tiempoDeEjecucion && typeof req.body?.tiempoDeEjecucion !== 'number') {
        return res.status(400).json({ message: 'Execution time must be a number' })
    }

    if (
        req.body.imgDeLaMaquina &&
        (typeof req.body?.imgDeLaMaquina !== 'string' || req.body?.imgDeLaMaquina.length < 7)
    ) {
        return res
            .status(400)
            .json({ message: 'The image of the machine must be a string of 8 or more characters and be at string' })
    }

    if (req.body.tareas && req.body?.tareas.length < 2) {
        return res.status(400).json({ message: 'Tasks must have more than 2 characters' })
    }

    if (req.body.comentario && req.body?.comentario.length < 2) {
        return res.status(400).json({ message: 'The comments must have more than 2 characters' })
    }

    if (req.body.maquina && typeof req.body?.maquina !== 'number') {
        return res.status(400).json({ message: 'The machine has to be a number' })
    }
    await db.connect()
    if (req.body.slug) {
        const slug = req.body.slug
        const otTesting = await OT.findOne({ slug })

        if (otTesting?.slug && otTesting._id.toString() !== _id) {
            return res.status(400).json({ message: 'Slug already exists' })
        }
    }

    try {
        const ot = await OT.findById(_id)

        if (!ot) {
            await db.disconnect()

            return res.status(404).json({ message: 'OT not found' })
        }
        await ot.update(req.body)

        await db.disconnect()

        return res.status(201).json({ message: 'OT updated successfully' })
    } catch (err) {
        console.log('error catch ===>', err)
        await db.disconnect()

        return res.status(500).json({ message: 'review server logs' })
    }
}

const deleteOT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as IOT

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    await db.connect()
    const inventory = await OT.findByIdAndDelete(_id)

    await db.disconnect()

    if (!inventory) {
        return res.status(400).json({ message: 'OT not found' })
    }

    return res.status(200).json({ message: 'OTs deleted successfully' })
}

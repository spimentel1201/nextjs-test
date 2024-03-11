import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database'
import { ISeguimiento } from '../../../interface'
import { CounterTable, Seguimiento } from '../../../models'

type Data = { message: string } | ISeguimiento[] | ISeguimiento

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getFollows(req, res)
        case 'POST':
            return createFollow(req, res)
        case 'PUT':
            return updateFollow(req, res)
        case 'DELETE':
            return deleteFollow(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getFollows = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // const page: number = parseInt(req.query.page as any) || 1
    // const limit: number = parseInt(req.query.limit as any) || 10
    const { searchParams = '' } = req.query

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
    const follows = await Seguimiento.find({ $or: [{ nombreDeObservador: regex }, { maquina_id_relacion: regex }] })
        .sort({ updatedAt: -1 })
        // .skip((page - 1) * limit)
        // .limit(limit)
        .lean()

    await db.disconnect()

    return res.status(200).send(
        follows,
        // page,
        // limit,
        // last_page,
        // previous_page,
        // next_page,
        // total,
    )
}

const createFollow = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        imgDeVerificacion = '',
        comentario = '',
        estadoDeLaMaquina = '',
        nombreDeObservador = '',
        tiempoDeFuncionamiento,
        tiempoDeReparacion,
        presentaFalla,
        tiempoDeFalla = 0,
        maquina_id_relacion,
    } = req.body as ISeguimiento

    if (typeof imgDeVerificacion !== 'string' || imgDeVerificacion.length < 7) {
        return res.status(400).json({ message: 'The imgDeVerificacion must be a string of 7 or more characters' })
    }

    if (typeof comentario !== 'string' || comentario.length < 2) {
        return res.status(400).json({ message: 'Comment must have more than 2 characters' })
    }

    if (!['bueno', 'malo', 'regular'].includes(estadoDeLaMaquina)) {
        return res.status(400).json({ message: 'The machine status is not valid' })
    }

    if (nombreDeObservador.length < 2) {
        return res.status(400).json({ message: 'Observer name must have more than 2 characters' })
    }

    if (isNaN(tiempoDeFuncionamiento) || Math.sign(tiempoDeFuncionamiento) === -1) {
        return res.status(400).json({ message: 'Operating time is not a number or negative number' })
    }

    if (isNaN(tiempoDeReparacion) || Math.sign(tiempoDeReparacion) === -1) {
        return res.status(400).json({ message: 'Time for a repair is not a number or negative number' })
    }

    if (!['si', 'no'].includes(presentaFalla)) {
        return res.status(400).json({ message: 'Submit faults is not valid' })
    }

    if (presentaFalla === 'si') {
        if (isNaN(tiempoDeFalla) || Math.sign(tiempoDeFalla) === -1) {
            return res.status(400).json({ message: 'Failure time is not a number or a negative number' })
        }
    }

    if (isNaN(maquina_id_relacion) || Math.sign(maquina_id_relacion) === -1) {
        return res.status(400).json({ message: 'Machine id relationship is not a number or negative number' })
    }

    await db.connect()

    try {
        const resSeg = await CounterTable.findOne({ idSeg: 'autoIDSeg' })

        let seqId: Number = 0

        if (!resSeg) {
            const newVal = new CounterTable({ idSeg: 'autoIDSeg', seqSeg: 1 })

            await newVal.save({ validateBeforeSave: true })
            seqId = 1
        } else {
            seqId = (resSeg.seqSeg as number) + 1
            await resSeg.updateOne({ seqSeg: (resSeg.seqSeg as number) + 1 })
        }

        const newFollow = new Seguimiento({ ...req.body, id_seguimiento: seqId })

        await newFollow.save({ validateBeforeSave: true })

        await db.disconnect()

        return res.status(201).json({ message: 'Follow created successfully' })
    } catch (err) {
        console.log('error catch ===>', err)
        await db.disconnect()

        return res.status(500).json({ message: 'review server logs' })
    }
}

const updateFollow = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as ISeguimiento

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    if (
        req.body?.imgDeVerificacion! &&
        (typeof req.body?.imgDeVerificacion! !== 'string' || req.body?.imgDeVerificacion!.length < 7)
    ) {
        return res.status(400).json({ message: 'The imgDeVerificacion must be a string of 8 or more characters' })
    }

    if (req.body?.comentario! && req.body?.comentario!.length < 2) {
        return res.status(400).json({ message: 'Comment must have more than 2 characters' })
    }

    if (req.body?.estadoDeLaMaquina! && !['bueno', 'malo', 'regular'].includes(req.body?.estadoDeLaMaquina!)) {
        return res.status(400).json({ message: 'The machine status is not valid' })
    }

    if (req.body?.nombreDeObservador! && req.body?.nombreDeObservador!.length < 2) {
        return res.status(400).json({ message: 'Observer name must have more than 2 characters' })
    }

    if (
        req.body?.tiempoDeFuncionamiento! &&
        (isNaN(req.body?.tiempoDeFuncionamiento!) || Math.sign(req.body?.tiempoDeFuncionamiento!) === -1)
    ) {
        return res.status(400).json({ message: 'Operating time is not a number or negative number' })
    }

    if (
        req.body?.tiempoDeReparacion! &&
        (isNaN(req.body?.tiempoDeReparacion!) || Math.sign(req.body?.tiempoDeReparacion!) === -1)
    ) {
        return res.status(400).json({ message: 'Time for a repair is not a number or negative number' })
    }

    if (!['si', 'no'].includes(req.body?.presentaFalla)) {
        return res.status(400).json({ message: 'Submit faults is not valid' })
    }

    if (req.body?.presentaFalla === 'si') {
        if (isNaN(req.body?.tiempoDeFalla) || Math.sign(req.body?.tiempoDeFalla) === -1) {
            return res.status(400).json({ message: 'Failure time is not a number or a negative number' })
        }
    }

    if (
        req.body?.maquina_id_relacion! &&
        (isNaN(req.body?.maquina_id_relacion!) || Math.sign(req.body?.maquina_id_relacion!) === -1)
    ) {
        return res.status(400).json({ message: 'Machine id relationship is not a number or negative number' })
    }

    try {
        await db.connect()
        const follow = await Seguimiento.findById(_id)

        if (!follow) {
            await db.disconnect()

            return res.status(404).json({ message: 'Follow not found' })
        }
        await follow.update(req.body)

        await db.disconnect()

        return res.status(201).json({ message: 'Follow updated successfully' })
    } catch (err) {
        console.log('error catch ===>', err)
        await db.disconnect()

        return res.status(500).json({ message: 'review server logs' })
    }
}

const deleteFollow = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as ISeguimiento

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    await db.connect()
    const follow = await Seguimiento.findByIdAndDelete(_id)

    await db.disconnect()

    if (!follow) {
        return res.status(400).json({ message: 'Follow not found' })
    }

    return res.status(200).json({ message: 'Follow deleted successfully' })
}

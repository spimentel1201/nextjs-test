import type { NextApiRequest, NextApiResponse } from 'next'

import moment from 'moment'

import { db } from '../../../database'
import { IInventario } from '../../../interface'
import { CounterTable, Inventario } from '../../../models'
import { validations } from '../../../utils'

type Data = { message: string } | IInventario[] | IInventario | Partial<IInventario[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getInventorys(req, res)
        case 'POST':
            return createInventory(req, res)
        case 'PUT':
            return updateInventory(req, res)
        case 'DELETE':
            return deleteInventory(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getInventorys = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // const page: number = parseInt(req.query.page as any) || 1
    // const limit: number = parseInt(req.query.limit as any) || 10
    const {
        searchParams = '',
        tipoInventario = '',
        estado = '',
        existencia_init = '-1',
        existencia_end = '99999999999',
        _id = '',
    } = req.query as {
        searchParams: string
        tipoInventario: string
        estado: string
        existencia_init: string
        existencia_end: string
        _id: string
    }
    let queryObj = {}
    let auxArr = [{ tipoInventario }, { estado }, { _id }]

    // for(let i = 0; i < auxArr.length; i++){
    //     auxArr[i] && (queryObj[`${auxArr[i]}`] = [auxArr[i]]);
    // }
    auxArr.forEach((item) => {
        Object.values(item)[0] && (queryObj[Object.keys(item)[0]] = Object.values(item)[0])
    })
    const regex = new RegExp(searchParams.toString(), 'i')

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

    const inventorys = await Inventario.find({
        // $and: [
        //     { $or: [{ nombre: searchParams }] },
        //     { $or: [{ tipoInventario: tipoInventario }] },
        //     { $or: [{ estado: estado }] },
        // ],
        ...queryObj,
        $or: [{ nombre: regex }],
        existencia: {
            $gte: existencia_init,
            $lte: existencia_end,
        },
    })
        .sort({ updatedAt: -1 })
        // .skip((page - 1) * limit)
        // .limit(limit)
        .lean()

    // console.log({ inventorys })
    await db.disconnect()

    return res.status(200).send(
        inventorys,
        // page,
        // limit,
        // last_page,
        // previous_page,
        // next_page,
        // total,
    )
}

const createInventory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        tipoInventario = '',
        nombre = '',
        estado = '',
        fechaDeEntrada = '',
        fechaDeActualizacion = '',
        imagenes = [],
        existencia,
        locacion = '',
        subLocacion,
    } = req.body as IInventario

    if (!['maquina', 'repuesto'].includes(tipoInventario)) {
        return res.status(400).json({ message: 'The inventory type is not valid' })
    }

    if (nombre.length < 3) {
        return res.status(400).json({ message: 'The name must be greater than 2 characters' })
    }

    if (!['bueno', 'malo', 'regular'].includes(estado)) {
        return res.status(400).json({ message: 'The state type is not valid' })
    }

    // if (!moment(fechaDeEntrada, 'DD/MM/YYYY', true).isValid()) {
    //     moment(fechaDeEntrada).format('DD/MM/YYYY')
    // }

    // if (!moment(fechaDeActualizacion, 'DD/MM/YYYY', true).isValid()) {
    //     moment(fechaDeActualizacion).format('DD/MM/YYYY')
    // }

    if (imagenes.length < 1 || imagenes.length > 3) {
        return res.status(404).json({ message: 'At least 1 image and a maximum of 3 images are required' })
    }

    if (isNaN(existencia) || Math.sign(existencia) === -1) {
        return res.status(400).json({ message: 'Stock is not a number or negative number' })
    }

    if (!['produccion', 'taller', 'bodega', 'oficina_administrativa'].includes(locacion)) {
        return res.status(400).json({ message: 'The location is not valid' })
    }

    if (isNaN(subLocacion)) {
        return res.status(400).json({ message: 'Sublocation is not a number' })
    }

    if (tipoInventario === 'maquina') {
        if (req.body.capacidadNominal && req.body?.capacidadNominal!.length < 1) {
            return res.status(400).json({ message: 'The nominal capacity must have more than 1 characters' })
        }

        if (req.body.serie && (req.body?.serie!.length < 2 || typeof req.body?.serie! !== 'string')) {
            return res.status(400).json({ message: 'The serial must have more than 2 characters and be a string' })
        }

        if (req.body.marca && (req.body?.marca!.length < 2 || typeof req.body?.marca! !== 'string')) {
            return res.status(400).json({ message: 'The brand must have more than 2 characters and  be a string' })
        }

        if (req.body.voltaje && (isNaN(req.body?.voltaje!) || Math.sign(req.body?.voltaje!) === -1)) {
            return res.status(400).json({ message: 'The voltage has to be a number and cannot be negative.' })
        }

        if (req.body.corriente && (isNaN(req.body?.corriente!) || Math.sign(req.body?.corriente!) === -1)) {
            return res.status(400).json({ message: 'The stream has to be a number and cannot be negative.' })
        }

        if (req.body.observacionGeneral && req.body?.observacionGeneral!.length < 2) {
            return res.status(400).json({ message: 'General comments must have more than 2 characters' })
        }

        await db.connect()

        try {
            const resMaq = await CounterTable.findOne({ idInventarioMaq: 'autoIDMaq' })

            let seqId: Number = 0

            if (!resMaq) {
                const newVal = new CounterTable({ idInventarioMaq: 'autoIDMaq', seqMaq: 1 })

                await newVal.save({ validateBeforeSave: true })
                seqId = 1
            } else {
                seqId = (resMaq.seqMaq as number) + 1
                await resMaq.updateOne({ seqMaq: (resMaq.seqMaq as number) + 1 })
            }

            const newInventory = new Inventario({ ...req.body, id_maquina: seqId })

            await newInventory.save({ validateBeforeSave: true })

            await db.disconnect()

            return res.status(201).json({ message: 'Inventory created successfully' })
        } catch (err) {
            console.log('error catch ===>', err)
            await db.disconnect()

            return res.status(500).json({ message: 'review server logs' })
        }
    }

    if (tipoInventario === 'repuesto') {
        if (req.body.validacionPorGPS && !['si', 'no'].includes(req.body.validacionPorGPS)) {
            return res.status(400).json({ message: 'GPS validation is not valid' })
        }

        if (req.body.coordenadas_gps && !validations.checkIfValidlatitudeAndlongitude(req.body?.coordenadas_gps!)) {
            return res.status(400).json({
                message: 'The coordinates entered are not valid, you can check that they do not have any spaces',
            })
        }

        if (req.body.validacionPorIMG && !['si', 'no'].includes(req.body.validacionPorIMG)) {
            return res.status(400).json({ message: 'IMG validation is not valid' })
        }

        if (req.body.maquina_id_relacion && req.body?.maquina_id_relacion!.length === 0) {
            return res.status(404).json({ message: 'At least one machine is required to relate the part' })
        }
        await db.connect()

        try {
            const resRep = await CounterTable.findOne({ idInventarioRep: 'autoIDRep' })

            // console.log({ resRep })
            let seqId: Number = 0

            if (!resRep) {
                const newVal = new CounterTable({ idInventarioRep: 'autoIDRep', seqRep: 1 })

                await newVal.save({ validateBeforeSave: true })
                seqId = 1
            } else {
                seqId = (resRep.seqRep as number) + 1
                await resRep.updateOne({ seqRep: (resRep.seqRep as number) + 1 })
            }
            // console.log({ seqId })
            const newInventory = new Inventario({ ...req.body, id_repuesto: seqId })

            await newInventory.save({ validateBeforeSave: true })

            await db.disconnect()

            return res.status(201).json({ message: 'Inventory created successfully' })
        } catch (err) {
            console.log('error catch ===>', err)
            await db.disconnect()

            return res.status(500).json({ message: 'review server logs' })
        }
    }
}

const updateInventory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '', tipoInventario = '' } = req.body as IInventario

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    // await db.connect()

    // let type = await Inventario.findById(_id).select('tipoInventario').lean()

    // if (!['maquina', 'repuesto'].includes(type?.tipoInventario!)) {
    //     await db.disconnect()

    //     return res.status(404).json({ message: 'Inventory type not found' })
    // }
    if (!['maquina', 'repuesto'].includes(tipoInventario)) {
        return res.status(404).json({ message: 'Inventory type not found' })
    }

    if (req.body.imgQR && (typeof req.body?.imgQR! !== 'string' || req.body?.imgQR!.length < 7)) {
        // await db.disconnect()

        return res.status(400).json({ message: 'The imgQR must be a string of 8 or more characters' })
    }

    if (req.body.nombre && req.body?.nombre!.length < 3) {
        // await db.disconnect()

        return res.status(400).json({ message: 'The name must be greater than 2 characters' })
    }

    if (req.body.estado && !['bueno', 'malo', 'regular'].includes(req.body.estado)) {
        // await db.disconnect()

        return res.status(400).json({ message: 'The state type is not valid' })
    }

    // if (req.body.fechaDeEntrada && !moment(req.body?.fechaDeEntrada!, 'DD/MM/YYYY', true).isValid()) {
    //     return res.status(400).json({ message: 'The entry date is not valid' })
    // }
    // if (req.body.fechaDeActualizacion && !moment(req.body?.fechaDeActualizacion!, 'DD/MM/YYYY', true).isValid()) {
    //     console.log(req.body.fechaDeActualizacion)

    //     return res.status(400).json({ message: 'Update date is not valid' })
    // }

    if (
        (req.body.imagenes && req.body?.imagenes!.length < 1) ||
        (req.body.imagenes && req.body?.imagenes!.length > 3)
    ) {
        // await db.disconnect()

        return res.status(404).json({ message: 'At least 1 image and a maximum of 3 images are required' })
    }

    if (
        (req.body.existencia && isNaN(req.body?.existencia!)) ||
        (req.body.existencia && Math.sign(req.body?.existencia!) === -1)
    ) {
        // await db.disconnect()

        return res.status(400).json({ message: 'Stock is not a number or negative number' })
    }

    if (
        req.body.locacion &&
        !['produccion', 'taller', 'bodega', 'oficina_administrativa'].includes(req.body?.locacion!)
    ) {
        // await db.disconnect()

        return res.status(400).json({ message: 'The location is not valid' })
    }
    //console.log(isNaN(req.body?.subLocacion!))
    if (req.body.subLocacion && isNaN(req.body?.subLocacion!)) {
        // await db.disconnect()

        return res.status(400).json({ message: 'Sublocation is not a number' })
    }
    await db.connect()
    if (tipoInventario! === 'maquina') {
        if (req.body.capacidadNominal && req.body?.capacidadNominal!.length < 2) {
            // await db.disconnect()

            return res.status(400).json({ message: 'The nominal capacity must have more than 2 characters' })
        }

        if (req.body.serie && (req.body?.serie!.length < 2 || typeof req.body?.serie! !== 'string')) {
            // await db.disconnect()

            return res.status(400).json({ message: 'The serial must have more than 2 characters and be a string' })
        }

        if (req.body.marca && (req.body?.marca!.length < 2 || typeof req.body?.marca! !== 'string')) {
            // await db.disconnect()

            return res.status(400).json({ message: 'The brand must have more than 2 characters and  be a string' })
        }

        if (req.body.voltaje && (isNaN(req.body?.voltaje!) || Math.sign(req.body?.voltaje!) === -1)) {
            // await db.disconnect()

            return res.status(400).json({ message: 'The voltage has to be a number and cannot be negative.' })
        }

        if (req.body.corriente && (isNaN(req.body?.corriente!) || Math.sign(req.body?.corriente!) === -1)) {
            // await db.disconnect()

            return res.status(400).json({ message: 'The stream has to be a number and cannot be negative.' })
        }

        if (req.body.observacionGeneral && req.body?.observacionGeneral!.length < 2) {
            // await db.disconnect()

            return res
                .status(400)
                .json({ message: 'General comments must have more than 2 characters and be a number' })
        }

        try {
            // await db.connect()

            const inventory = await Inventario.findById(_id)

            if (!inventory) {
                await db.disconnect()

                return res.status(404).json({ message: 'Inventory not found' })
            }
            await inventory.update(req.body)

            await db.disconnect()

            return res.status(201).json({ message: 'Inventory updated successfully' })
        } catch (err) {
            console.log('error catch ===>', err)
            await db.disconnect()

            return res.status(500).json({ message: 'review server logs' })
        }
    }

    if (tipoInventario! === 'repuesto') {
        if (req.body.validacionPorGPS && !['si', 'no'].includes(req.body.validacionPorGPS)) {
            // await db.disconnect()

            return res.status(400).json({ message: 'GPS validation is not valid' })
        }

        if (req.body.coordenadas_gps && !validations.checkIfValidlatitudeAndlongitude(req.body?.coordenadas_gps!)) {
            // await db.disconnect()

            return res.status(400).json({
                message: 'The coordinates entered are not valid, you can check that they do not have any spaces',
            })
        }

        if (req.body.validacionPorIMG && !['si', 'no'].includes(req.body.validacionPorIMG)) {
            // await db.disconnect()

            return res.status(400).json({ message: 'IMG validation is not valid' })
        }

        if (req.body.maquina_id_relacion && req.body?.maquina_id_relacion!.length === 0) {
            // await db.disconnect()

            return res.status(404).json({ message: 'At least one machine is required to relate the part' })
        }

        try {
            // await db.connect()

            const inventory = await Inventario.findById(_id)

            if (!inventory) {
                await db.disconnect()

                return res.status(404).json({ message: 'Inventory not found' })
            }
            await inventory.update(req.body)

            await db.disconnect()

            return res.status(201).json({ message: 'Inventory updated successfully' })
        } catch (err) {
            console.log('error catch ===>', err)
            await db.disconnect()

            return res.status(500).json({ message: 'review server logs' })
        }
    }
}

const deleteInventory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as IInventario

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    await db.connect()
    const inventory = await Inventario.findByIdAndDelete(_id)

    await db.disconnect()

    if (!inventory) {
        return res.status(400).json({ message: 'Inventory not found' })
    }

    return res.status(200).json({ message: 'Inventory deleted successfully' })
}

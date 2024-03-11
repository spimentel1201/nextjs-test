import type { NextApiRequest, NextApiResponse } from 'next'

import bcryptjs from 'bcryptjs'

import { db } from '../../../database'
import { IUser } from '../../../interface'
import { User } from '../../../models'
import { validations } from '../../../utils'

type Data = { message: string } | IUser | IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res)
        case 'POST':
            return createUser(req, res)
        case 'PUT':
            return updateUser(req, res)
        case 'DELETE':
            return deleteUser(req, res)
        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
    const users = await User.find({ $or: [{ nombre: regex }, { rol: regex }] })
        .select('-contrasena')
        .sort({ createdAt: -1 })
        // .skip((page - 1) * limit)
        // .limit(limit)
        .lean()

    await db.disconnect()

    return res.status(200).send(
        users,
        // page,
        // limit,
        // last_page,
        // previous_page,
        // next_page,
        // total,
    )
}

const createUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {
        nombre = '',
        email = '',
        contrasena = '',
        rol = '',
    } = req.body as { email: string; contrasena: string; nombre: string; rol: string }

    if (contrasena.length < 5) {
        return res.status(400).json({ message: 'The password must be greater than 5 characters' })
    }

    if (nombre.length < 2) {
        return res.status(400).json({ message: 'The name must be greater than 2 characters' })
    }

    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'The email is not  validated' })
    }

    if (!['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'].includes(rol)) {
        return res.status(400).json({ message: 'the role is not valid' })
    }

    await db.connect()

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ message: 'Email already exists' })
    }

    const newUser = new User({
        nombre,
        email: email.toLocaleLowerCase(),
        contrasena: bcryptjs.hashSync(contrasena),
        rol,
    })

    try {
        await newUser.save({ validateBeforeSave: true })
        await db.disconnect()

        return res.status(201).json(newUser)
    } catch (e) {
        console.log('error catch ===>', e)
        await db.disconnect()

        return res.status(500).json({ message: 'review server logs' })
    }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // nombre = '', email = '', contrasena = '', rol = ''
    const { _id = '' } = req.body as IUser

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    if (req.body.contrasena && req.body?.contrasena!.length < 5) {
        return res.status(400).json({ message: 'The password must be greater than 5 characters for update' })
    }

    if (req.body.contrasena) {
        req.body.contrasena = bcryptjs.hashSync(req.body.contrasena)
    }

    if (req.body.nombre && req.body?.nombre!.length < 2) {
        return res.status(400).json({ message: 'The name must be greater than 2 characters for update' })
    }

    if (req.body.email && !validations.isValidEmail(req.body?.email!)) {
        return res.status(400).json({ message: 'The email is not  validated for update' })
    }

    if (req.body.rol && !['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'].includes(req.body?.rol!)) {
        return res.status(400).json({ message: 'the role is not valid for update' })
    }

    try {
        await db.connect()
        const user = await User.findById(_id)

        if (!user) {
            await db.disconnect()

            return res.status(404).json({ message: 'User not found' })
        }

        //actualizamos como venga si cambio algo por lo mas minimo que sea pues lo guardamos
        await user.update(req.body)

        await db.disconnect()

        return res.status(200).json({ message: `User Update Successfully` })
    } catch (error) {
        await db.disconnect()
        console.log({ error })

        return res.status(404).json({ message: 'Check the server console' })
    }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '' } = req.body as IUser

    if (_id === '') {
        return res.status(400).json({ message: '_id is required' })
    }

    await db.connect()
    const user = await User.findByIdAndDelete(_id)

    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    return res.status(200).json({ message: 'user deleted successfully' })
}

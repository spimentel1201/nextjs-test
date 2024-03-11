import bcryptjs from 'bcryptjs'

import { User } from '../models'

import { db } from '.'

export const checkUserEmailContrasena = async (email: string, contrasena: string) => {
    await db.connect()

    const user = await User.findOne({ email })

    await db.disconnect()

    if (!user) {
        //si no existe o credenciales incorrectas
        return null
    }

    if (!bcryptjs.compareSync(contrasena, user.contrasena)) {
        //si la contraseña escrita es diferente a la contraseña encriptada en la dbUser
        return null
    }

    const { rol, nombre, _id } = user

    return { _id, email: email.toLocaleLowerCase(), rol, nombre }
}

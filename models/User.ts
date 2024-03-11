import mongoose, { model, Model, Schema } from 'mongoose'

import { IUser } from '../interface'

const userSchema = new Schema(
    {
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contrasena: { type: String, required: true },
        rol: {
            type: String,
            enum: {
                values: ['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'],
                message: '{VALUE} no es un rol valido',
                default: 'mtto',
                required: true,
            },
        },
    },
    {
        timestamps: true,
    },
)

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User

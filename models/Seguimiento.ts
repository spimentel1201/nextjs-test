import mongoose, { model, Model, Schema } from 'mongoose'

import { ISeguimiento } from '../interface'

const seguimientoSchema = new Schema(
    {
        id_seguimiento: { type: Number, required: true, unique: true },
        imgDeVerificacion: { type: String, required: true },

        comentario: { type: String, required: true },
        estadoDeLaMaquina: {
            type: String,
            enum: {
                values: ['bueno', 'malo', 'regular'],
                message: '{VALUE} no es un estado valido',
                default: 'regular',
                required: true,
            },
        },
        nombreDeObservador: { type: String, required: true },

        tiempoDeFuncionamiento: { type: Number, required: true },
        tiempoDeReparacion: { type: Number, required: true },

        presentaFalla: {
            type: String,
            enum: {
                values: ['si', 'no'],
                message: '{VALUE} no es una respuesta valida',
                default: 'no',
                required: true,
            },
        },

        tiempoDeFalla: { type: Number, default: 0 },

        maquina_id_relacion: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

const Seguimiento: Model<ISeguimiento> = mongoose.models.Seguimiento || model('Seguimiento', seguimientoSchema)

export default Seguimiento

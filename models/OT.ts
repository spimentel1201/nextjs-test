import mongoose, { model, Model, Schema } from 'mongoose'

import { IOT } from '../interface'

const otSchema = new Schema(
    {
        ot_id: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },

        maquina: { type: Number, required: true },
        repuesto: { type: String },
        tecnico_ing: { type: String, required: true },

        estado_de_OT: {
            type: String,
            enum: {
                values: ['pendiente', 'en_proceso', 'finalizada'],
                message: '{VALUE} no es un estado de OT aceptable',
                default: 'pendiente',
                required: true,
            },
        },

        numero_de_orden_de_compra: { type: String },

        fecha_expedicion: { type: String, required: true },
        tiempoDeEjecucion: { type: String },
        fecha_cierre: { type: String },

        imgDeLaMaquina: { type: String },

        tareas: { type: String, required: true },
        // [
        //     {
        //         nombreDeActividad_o_descripcion_de_la_orden: { type: String, required: true },
        //         cantidad_de_actividad: { type: String, required: true },
        //     },
        // ],
        comentario: { type: String },
    },
    {
        timestamps: true,
    },
)

const OT: Model<IOT> = mongoose.models.OT || model('OT', otSchema)

export default OT

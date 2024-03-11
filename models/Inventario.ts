import mongoose, { model, Model, Schema } from 'mongoose'

import { IInventario } from '../interface'

const inventarioSchema = new Schema(
    {
        tipoInventario: {
            type: String,
            enum: {
                values: ['maquina', 'repuesto'],
                message: '{VALUE} no es un tip de inventario valido',
                default: 'repuesto',
                required: true,
            },
        },
        nombre: { type: String, required: true },
        imgQR: { type: String, required: false, default: '' },
        estado: {
            type: String,
            enum: {
                values: ['bueno', 'malo', 'regular'],
                message: '{VALUE} no es un estado valido',
                default: 'regular',
                required: true,
            },
        },
        imagenes: [{ type: String, required: true }],
        fechaDeEntrada: { type: String, required: true },
        fechaDeActualizacion: { type: String, required: true },
        existencia: { type: Number, required: true },
        locacion: {
            type: String,
            enum: {
                values: ['produccion', 'taller', 'bodega', 'oficina_administrativa'],
                message: '{VALUE} no es una locacion permitida',
                default: 'bodega',
                required: true,
            },
        },
        subLocacion: { type: Number, required: true },

        //maquina condicional
        id_maquina: { type: Number, unique: false, required: false },
        capacidadNominal: { type: String, required: false },
        serie: { type: String, required: false },
        marca: { type: String, required: false },
        voltaje: { type: Number, required: false },
        corriente: { type: Number, required: false },
        observacionGeneral: { type: String, required: false },
        // ind: [
        //     {
        //         frecuencia_de_reparacion: { type: Number },
        //         frecuencia_de_falla: { type: Number },
        //         porcentaje_de_disponibilidad: { type: Number },
        //     },
        // ],

        //repuesto condicional
        id_repuesto: { type: Number, unique: false, required: false },
        validacionPorGPS: {
            type: String,
            enum: {
                values: ['si', 'no'],
                message: '{VALUE} no es una respuesta valida',
                default: 'no',
                required: true,
            },
        },
        coordenadas_gps: { type: String, required: false },
        validacionPorIMG: {
            type: String,
            enum: {
                values: ['si', 'no'],
                message: '{VALUE} no es una respuesta valida',
                default: 'no',
                required: true,
            },
        },
        maquina_id_relacion: [{ type: String, required: false, unique: false }],
    },
    {
        timestamps: true,
    },
)

const Inventario: Model<IInventario> = mongoose.models.Inventario || model('Inventario', inventarioSchema)

export default Inventario

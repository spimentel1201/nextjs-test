import moment, { isDate } from 'moment'
import * as yup from 'yup'

import { checkIfValidlatitudeAndlongitude } from '../validations'

// function parseDateString(value, originalValue) {
//     const parsedDate = isDate(originalValue) ? originalValue : moment(originalValue).format('DD/MM/YYYY')

//     return parsedDate
// }

export const validationUpdateInventory = yup.object().shape({
    tipoInventario: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['maquina', 'repuesto'], 'Debe de escoger entre estas opciones'),
    nombre: yup.string().required('Campo requerido.').min(3, 'Debe de colocar un nombre con mas de 2 caracteres'),
    estado: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['bueno', 'malo', 'regular'], 'Debe de escoger entre estas opciones'),
    fechaDeEntrada: yup.string().required('Campo requerido.'),
    fechaDeActualizacion: yup.string().required('Campo requerido.'),
    imgQR: yup.string().min(1, 'mínimo 1 imagen por inventario'),

    imagenes: yup
        .array()
        .required('Campo requerido')
        .min(1, 'mínimo 1 imágenes por inventario')
        .max(3, 'máximo 3 imágenes por inventario'),
    existencia: yup
        .number()
        .required('Campo requerido.')
        .positive()
        .min(0, 'Las existencia tiene que ser un número y no puede ser negativo'),
    locacion: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['produccion', 'taller', 'bodega', 'oficina_administrativa'], 'Debe de escoger entre estas opciones'),
    subLocacion: yup
        .number()
        .required('Campo requerido.')
        .positive()
        .min(1, 'La subLocacion tiene que ser un número y no puede ser negativo'),

    //si es una maquina validar los siguientes campos
    capacidadNominal: yup.string().when('tipoInventario', {
        is: 'maquina',
        then: yup
            .string()
            .required('Campo requerido.')
            .min(1, 'Debe de colocar una capacidad nominal con al menos 1 carácter'),
    }),
    serie: yup.string().when('tipoInventario', {
        is: 'maquina',
        then: yup.string().required('Campo requerido.').min(3, 'Debe de colocar un serial con mas de 2 caracteres'),
    }),
    marca: yup.string().when('tipoInventario', {
        is: 'maquina',
        then: yup.string().required('Campo requerido.').min(3, 'Debe de colocar una marca con mas de 2 caracteres'),
    }),
    voltaje: yup.number().when('tipoInventario', {
        is: 'maquina',
        then: yup
            .number()
            .required('Campo requerido.')
            .positive()
            .min(1, 'El voltaje tiene que ser un número y no puede ser negativo'),
    }),
    corriente: yup.number().when('tipoInventario', {
        is: 'maquina',
        then: yup
            .number()
            .required('Campo requerido.')
            .positive()
            .min(1, 'La corriente tiene que ser un número y no puede ser negativo'),
    }),
    observacionGeneral: yup.string().when('tipoInventario', {
        is: 'maquina',
        then: yup
            .string()
            .required('Campo requerido.')
            .min(3, 'Los comentarios generales deben tener más de 2 caracteres'),
    }),

    //si es un repuesto validar los siguientes campos
    validacionPorGPS: yup.string().when('tipoInventario', {
        is: 'repuesto',
        then: yup.string().required('Campo requerido.').oneOf(['si', 'no'], 'Debe de escoger entre estas opciones'),
    }),
    coordenadas_gps: yup.string().when('validacionPorGPS', {
        is: 'si',
        then: yup
            .string()
            .required(
                'Campo requerido. recuerda que debe de ser una coordenada valida usando "," para separar ambos dígitos',
            )
            .transform(function (value, originalValue) {
                if (checkIfValidlatitudeAndlongitude(originalValue)) {
                    return originalValue
                }
            }),
    }),
    validacionPorIMG: yup.string().when('tipoInventario', {
        is: 'repuesto',
        then: yup.string().required('Campo requerido.').oneOf(['si', 'no'], 'Debe de escoger entre estas opciones'),
    }),
    maquina_id_relacion: yup.array().when('tipoInventario', {
        is: 'repuesto',
        then: yup.array().required('Campo requerido').min(1, 'mínimo una maquina por inventario'),
    }),
})

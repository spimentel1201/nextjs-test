import * as yup from 'yup'

export const validationCreateOT = yup.object().shape({
    slug: yup.string().required('Campo requerido.').min(3, 'El slug debe de tener mas de 3 caracteres y ser único'),
    repuesto: yup.string(),
    tecnico_ing: yup.string().required('Campo requerido.'),
    estado_de_OT: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['pendiente', 'en_proceso', 'finalizada'], 'Debe de escoger entre estas opciones'),
    numero_de_orden_de_compra: yup.string().min(3, 'El numero de orden de compra debe de tener mas de 3 caracteres'),
    fecha_expedicion: yup.date().required('Campo requerido.'),
    tiempoDeEjecucion: yup
        .number()
        .positive()
        .min(1, 'El tiempo de ejecución tiene que ser un número y no puede ser negativo'),
    fecha_cierre: yup.date().required('Campo requerido.'),
    imgDeLaMaquina: yup.string().required('Campo requerido').min(1, 'mínimo 1 imagen por ot'),
    tareas: yup.string().required('Campo requerido.').min(3, 'Las tareas deben tener más de 2 caracteres'),
    comentario: yup.string().min(3, 'Los comentarios generales deben tener más de 2 caracteres'),
    maquina: yup.number().required('Campo requerido.'),
})

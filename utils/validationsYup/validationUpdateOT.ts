import * as yup from 'yup'

export const validationUpdateOT = yup.object().shape(
    {
        slug: yup.string().min(3, 'El slug debe de tener mas de 3 caracteres y ser único'),
        repuesto: yup.string(),
        tecnico_ing: yup.string(),
        estado_de_OT: yup
            .string()
            .oneOf(['pendiente', 'en_proceso', 'finalizada'], 'Debe de escoger entre estas opciones'),
        numero_de_orden_de_compra: yup.string().when('numero_de_orden_de_compra', {
            is: (value: string) => value?.length,
            then: yup.string().min(3, 'El numero de orden de compra debe de tener mas de 3 caracteres'),
        }),

        fecha_expedicion: yup.date(),
        tiempoDeEjecucion: yup
            .number()
            .positive()
            .min(1, 'El tiempo de ejecución tiene que ser un número  ademas de ser mayor a cero'),
        fecha_cierre: yup.date(),
        imgDeLaMaquina: yup.string().min(1, 'mínimo 1 imagen por ot'),
        tareas: yup.string().min(3, 'Las tareas deben tener más de 2 caracteres'),
        comentario: yup.string().when('comentario', {
            is: (value: string) => value?.length,
            then: yup.string().min(3, 'Los comentarios generales deben tener más de 2 caracteres'),
        }),
        maquina: yup.number(),
    },
    [
        // Add Cyclic deps here because when require itself
        ['numero_de_orden_de_compra', 'numero_de_orden_de_compra'],
        ['comentario', 'comentario'],
    ],
)

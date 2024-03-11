import * as yup from 'yup'

export const validationUpdateFollow = yup.object().shape({
    imgDeVerificacion: yup.string().min(1, 'mínimo 1 imagen por seguimiento'),
    comentario: yup.string().min(3, 'Los comentarios generales deben tener más de 2 caracteres'),
    estadoDeLaMaquina: yup.string().oneOf(['bueno', 'malo', 'regular'], 'Debe de escoger entre estas opciones'),
    nombreDeObservador: yup.string().min(3, 'Debe de colocar un nombre de observador con mas de 2 caracteres'),
    tiempoDeFuncionamiento: yup
        .number()
        .positive()
        .min(1, 'El tiempo de funcionamiento tiene que ser un número y no puede ser negativo'),
    tiempoDeReparacion: yup
        .number()
        .positive()
        .min(1, 'El tiempo de reparación tiene que ser un número y no puede ser negativo'),

    presentaFalla: yup.string().oneOf(['si', 'no'], 'Debe de escoger entre estas opciones'),

    tiempoDeFalla: yup.number().when('presentaFalla', {
        is: 'si',
        then: yup.number().positive().min(0, 'El tiempo de falla tiene que ser un número y no puede ser negativo'),
    }),
})

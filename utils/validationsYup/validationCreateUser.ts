import * as yup from 'yup'

export const validationCreateUser = yup.object().shape({
    nombre: yup.string().required('Campo requerido.').min(3, 'Debe de colocar un nombre con mas de 2 caracteres'),
    email: yup.string().required('Campo requerido.').email('Ingrese un email válido.'),
    contrasena: yup
        .string()
        .required('Campo requerido.')
        .min(5, 'Debe de colocar una contraseña con mas de 5 caracteres'),
    rol: yup
        .string()
        .required('Campo requerido.')
        .oneOf(['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'], 'Debe de escoger entre estas opciones'),
})

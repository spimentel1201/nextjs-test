import * as yup from 'yup'

export const validationUpdateUser = yup.object().shape({
    nombre: yup.string().min(3, 'Debe de colocar un nombre con mas de 2 caracteres'),
    email: yup.string().email('Ingrese un email válido.'),
    contrasena: yup.string(),
    rol: yup
        .string()
        .oneOf(['super_admin', 'admin_bodega', 'bodega', 'admin_mtto', 'mtto'], 'Debe de escoger entre estas opciones'),
})

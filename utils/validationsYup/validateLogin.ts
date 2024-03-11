import * as yup from 'yup'

export const validateLogin = yup.object().shape({
    email: yup.string().required('Campo requerido.').email('Ingrese un email válido.'),
    contrasena: yup.string().required('Campo requerido.'),
})

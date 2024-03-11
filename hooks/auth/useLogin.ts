import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { yupValidations } from '../../utils'

export interface FormData {
    email: string
    contrasena: string
}

export const useLogin = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const formsMethods = useForm<FormData>({
        resolver: yupResolver(yupValidations.validateLogin),
    })

    const handleOnChangeShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const onLoginUser = async ({ email, contrasena }: FormData) => {
        setShowError(false)
        setIsLoading(true)
        //los probiders que recibe esta funcion son todos los que le halla pasado yo por [...nextauth].ts, mando primero el tag que quiero dirigirme en este caso es 'credentials'
        await signIn('credentials', { email, contrasena })
        setIsLoading(false)
    }

    return {
        //states
        showPassword,
        showError,
        isLoading,

        //methods
        formsMethods,

        //funtions
        handleOnChangeShowPassword,
        onLoginUser,
    }
}

import { useSession, signOut } from 'next-auth/react'
import { FC, ReactNode, useEffect, useReducer } from 'react'

import { IUser } from '../../interface'

import { AuthContext, authReducer } from './'

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
    const { data, status } = useSession()
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    useEffect(() => {
        // console.log({ status, user: data?.user })
        if (status === 'authenticated') {
            //TODO para poder guardar nuestra session en nuestro provider
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    }, [status, data])

    const logout = () => {
        signOut()
        //hace un refresh de la app quiere decir que todo lo guardado en los demas Context se perderan a no ser que los seteemos de nuevo
        //todo esto es para authpersonalizado no para nextAuth
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                //methods
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

import { createContext } from 'react'

import { IUser } from '../../interface'

export interface ContextProps {
    isLoggedIn: boolean
    user?: IUser
    //methods
    logout: () => void
}

export const AuthContext = createContext({} as ContextProps)

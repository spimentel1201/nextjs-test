import { createContext } from 'react'

import { IUser } from '../../interface'

interface ContextProps {
    //state
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataUsers: IUser[] | []
    isUpdateUser: Boolean
    userForUpdate: IUser | undefined

    //functions
    getUsersData: (searchParamsReq?: string) => Promise<IUser[]>
    changeIsLoading: () => void
    changeIsUpdateUser: (val: boolean) => void
    changeUserForUpdate: (singleUser: IUser) => void
    changeMsmTextDelete: (email: string) => void
    changeMsmTextUpdate: (_id: string) => void
    //TODO:
    handleCreateUser: (data: IUser) => void
    handleUpdateUser: (data: Partial<IUser>) => void
    handleDeleteUser: (_id: string) => void
}

export const UsersContext = createContext({} as ContextProps)

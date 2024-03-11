import { FC, ReactNode, useReducer } from 'react'

import { IUser } from '../../interface'
import { managementApi } from '../../services'

import { UsersContext } from './UsersContext'
import { usersReducer } from './usersReducer'

export interface UsersState {
    msmTextDelete: string
    msmTextUpdate: string
    isLoading: boolean
    dataUsers: IUser[] | []
    isUpdateUser: Boolean
    userForUpdate: IUser | undefined
}

const USERS_INITIAL_STATE: UsersState = {
    msmTextDelete: '',
    msmTextUpdate: '',
    isLoading: false,
    dataUsers: [],
    isUpdateUser: false,
    userForUpdate: undefined,
}

interface Props {
    children: ReactNode
}

export const UsersProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, USERS_INITIAL_STATE)

    const getUsersData = async (searchParamsReq?: string): Promise<IUser[]> => {
        return await managementApi
            .get('/admin/users', {
                params: { searchParams: searchParamsReq || '' },
            })
            .then(({ data }) => {
                dispatch({ type: '[USERS] Get users data', payload: data })

                return data
            })
            .catch((err) => {
                console.log(err.message)
                let arr: [] = []

                dispatch({ type: '[USERS] Get users data', payload: arr })

                return arr
            })
    }

    const handleCreateUser = async (data: IUser) => {
        await managementApi
            .post('/admin/users', { ...data })
            .then(() => {
                getUsersData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleUpdateUser = async (data: Partial<IUser>) => {
        await managementApi
            .put('/admin/users', { ...data })
            .then(() => {
                getUsersData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleDeleteUser = async (_id: string) => {
        await managementApi
            .delete('/admin/users', { data: { _id } })
            .then(() => {
                getUsersData()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const changeIsLoading = () => {
        dispatch({ type: '[USERS] Change is loading users' })
    }

    const changeIsUpdateUser = (val: boolean) => {
        dispatch({ type: '[USERS] Change is updated user', payload: val })
    }

    const changeUserForUpdate = (singleUser: IUser | undefined) => {
        dispatch({ type: '[USERS] Get user for update', payload: singleUser })
    }

    const changeMsmTextDelete = (email: string) => {
        dispatch({ type: '[USERS] Change msm text for delete user', payload: email })
    }
    const changeMsmTextUpdate = (_id: string) => {
        dispatch({ type: '[USERS] Change msm text for update user', payload: _id })
    }

    return (
        <UsersContext.Provider
            value={{
                ...state,

                //functions
                getUsersData,
                changeIsLoading,
                changeIsUpdateUser,
                changeUserForUpdate,
                changeMsmTextDelete,
                changeMsmTextUpdate,
                handleCreateUser,
                handleUpdateUser,
                handleDeleteUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}

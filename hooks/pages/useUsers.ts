import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { UIContext, UsersContext } from '../../context'
import { IUser } from '../../interface'
import { yupValidations } from '../../utils'

export const useUsers = () => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalUsers, toggleModalWarringDeleted } =
        useContext(UIContext)
    const {
        userForUpdate,
        isUpdateUser,
        getUsersData,
        changeMsmTextDelete,
        changeMsmTextUpdate,
        changeIsUpdateUser,
        changeIsLoading,
        changeUserForUpdate,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser,
    } = useContext(UsersContext)
    const [idForDelete, setIdForDelete] = useState('')

    useEffect(() => {
        changeIsLoading()
        getUsersData()
        changeIsLoading()
    }, [])

    const formMethodsCreate = useForm<IUser>({
        resolver: yupResolver(yupValidations.validationCreateUser),
    })

    const formMethodsUpdate = useForm<IUser>({
        resolver: yupResolver(yupValidations.validationUpdateUser),
    })

    const changeModalCreate = () => {
        changeIsUpdateUser(false)
        toggleModalUsers()
    }

    const changeModalUpdate = (singleUser: IUser) => {
        changeIsUpdateUser(true)
        changeUserForUpdate(singleUser)
        toggleModalUsers()
    }

    useEffect(() => {
        if (userForUpdate?._id) {
            formMethodsCreate.reset()
            formMethodsUpdate.reset({ ...userForUpdate })
        }

        return () => {
            formMethodsUpdate.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userForUpdate])

    const handleCreateOrUpdateUser = (data: IUser) => {
        if (isUpdateUser) {
            changeMsmTextUpdate(data._id)
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleUpdateUser(data)
            changeIsLoading()
            //console.log('actualizando:', data)
        } else {
            changeMsmTextUpdate('')
            //TODO: hacer funcionalidad correspondiente al clg
            changeIsLoading()
            handleCreateUser(data)
            changeIsLoading()
            // console.log('creando', data)
        }
        toggleModalUsers()
        toggleSnackBarSuccess()
    }

    const warringDeletedUser = (email: string, _id: string) => {
        setIdForDelete(_id)
        changeMsmTextDelete(email)
        toggleModalWarringDeleted()
    }

    const handleDeletedUser = () => {
        changeIsLoading()
        handleDeleteUser(idForDelete)
        changeIsLoading()
        toggleModalWarringDeleted()
        toggleSnackBarError()
    }

    return {
        //states

        //methods
        formMethodsCreate,
        formMethodsUpdate,
        //functions
        changeModalCreate,
        changeModalUpdate,
        handleCreateOrUpdateUser,
        handleDeletedUser,
        warringDeletedUser,
    }
}
